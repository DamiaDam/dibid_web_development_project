import { Injectable, Logger } from '@nestjs/common';
import { BidService } from 'src/db/bid/bid.service';
import { CategoryService } from 'src/db/category/category.service';
import { CountryService } from 'src/db/country/country.service';
import { ProductItem } from 'src/db/productItem/productItem.entity';
import { ProductItemService } from 'src/db/productItem/productItem.service';
import * as moment from 'moment';
import * as fs from 'fs';

@Injectable()
export class ExportService {
  private readonly logger = new Logger(ExportService.name);
  keystorePath: string;

  constructor(
    private productService: ProductItemService,
    private categoryService: CategoryService,
    private bidService: BidService,
    private countryService: CountryService
  ) { }

  async exportAllItems (filetype: string) {
    const products: ProductItem[] = await this.productService.getAllProducts();

    if ( !fs.existsSync('storage'))
        fs.mkdirSync('storage');
    if ( !fs.existsSync('storage/exports'))
        fs.mkdirSync('storage/exports');

    var type: string;
    if( filetype === 'xml' || filetype === 'json')
      type = filetype;
    else
      type = 'xml';

    var filename = 'bids-' + new Date().toISOString() + '.' + type;

    var items: string = ""

    for (const product of products) {
        items += await this.exportOneProduct(product);
    }

    if(type === 'xml') {
      fs.writeFileSync('storage/exports/'+filename, items);
    }
    else if(type === 'json') {

      items = '<obj>\n' + items + '</obj>\n';
      var parseString = require('xml2js').parseString;
      parseString(items, function (err, result) {
        fs.writeFileSync('storage/exports/'+filename, JSON.stringify(result.obj));
      });
    }

    return filename;
  }

  async exportOneProduct (product: ProductItem): Promise<string> {

    let item: string = "";

    item += `<Item ItemID="${product.productId}">\n`
    item += `  <Name>${product.name}</Name>\n`

    const categories = await this.categoryService.getProductCategoryObjects(product.productId)
    for (const category of categories) {
      item += `  <Category>${category.name}</Category>\n`
    }

    item += `  <Currently>${product.currentBid}</Currently>\n`
    item += `  <First_Bid>${product.firstBid}</First_Bid>\n`
    item += `  <Number_Of_Bids>${product.numberOfBids}</Number_Of_Bids>\n`
    item += `  <Bids>\n`
    
    const bids = await this.bidService.findAllBidsOnProduct(product);
    for (const bid of bids) {
      item += `    <Bid>\n`
      item += `      <Bidder Rating="${bid.bidder.bidderRating}" UserID="${bid.bidder.username}">\n`
      item += `        <Location>${bid.bidder.location}</Location>\n`
      item += `        <Country>${await this.countryService.getCountryNameById(bid.bidder.countryId)}</Country>\n`
      item += `      </Bidder>\n`
      item += `      <Time>${moment(bid.timeOfBid, 'x').format('MMM-DD-YY HH:MM:SS')}</Time>\n`
      item += `      <Amount>${bid.price}</Amount>\n`
      item += `    </Bid>\n`
    }
    item += `  </Bids>\n`
    item += `  <Location>${product.location}</Location>\n`
    item += `  <Country>${await this.countryService.getCountryNameById(product.seller.countryId)}</Country>\n`
    item += `  <Started>${moment(product.startingDate, 'x').format('MMM-DD-YY HH:MM:ss')}</Started>\n`
    item += `  <Ends>${moment(product.endingDate, 'x').format('MMM-DD-YY HH:MM:ss')}</Ends>\n`
    item += `  <Seller Rating="${product.seller.sellerRating}" UserID="${product.seller.username}"/>\n`
    item += `  <Description>${product.description}</Description>\n`
    item += `</Item>\n`;

    return item;
  }

  // Get an existing file
  async getExportedFile(filename: string): Promise<string> {
    const filePath = `storage/exports/${filename}`;

    return (await fs.readFileSync(filePath, 'utf8')).toString();
  }

  // Delete an existing file
  async deleteFile(filePath: string): Promise<void>
  {

    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
        console.error(err);
        return err;
        }
      });
      console.log('deleted ', filePath);
    }
  }

}