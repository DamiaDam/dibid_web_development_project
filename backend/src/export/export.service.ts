import { Injectable, Logger } from '@nestjs/common';
import { BidService } from 'src/db/bid/bid.service';
import { CategoryService } from 'src/db/category/category.service';
import { CountryService } from 'src/db/country/country.service';
import { ProductItem } from 'src/db/productItem/productItem.entity';
import { ProductItemService } from 'src/db/productItem/productItem.service';
import * as moment from 'moment';
import * as fs from 'fs';
import { CustomRepositoryCannotInheritRepositoryError } from 'typeorm';

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
    var file = fs.createWriteStream('storage/exports/'+filename, {
        flags: 'a'
    })

    for (const product of products) {
        await this.exportOneProduct(product, file);
    }

    file.end();

    if(type === 'json') {

      var jsonString: string;

      var xml2js = require('xml2js'); 
      var parser = new xml2js.Parser();
      console.log('filename: ', `storage/exports/`+filename)
      fs.readFile(`storage/exports/`+filename, 'utf8', function(err, data) {
          console.log(data.toString());
          parser.parseString(data.toString(), function (err, result) {
              console.log(err);
              console.log(result);
              jsonString = result;
              try{fs.writeFileSync(`storage/exports/`+filename, jsonString)}
              catch{(err) => console.log('err: ', err)}
              console.log('Done');
          });
      });


    }
    
    if(type === 'json') {
      console.log('js', jsonString)
      try{fs.writeFileSync(`storage/exports/`+filename, jsonString)}
      catch{(err) => console.log('err: ', err)}
    }
    else {
      console.log('type: ', type)
    }

    console.log('fil', filename)

    return filename;
  }

  async exportOneProduct (product: ProductItem, file: fs.WriteStream) {
    file.write('<Item ItemID="' + product.productId + '">\n');
        file.write('    <Name>' + product.name + '</Name>\n')
        const categories = await this.categoryService.getProductCategoryObjects(product.productId)
        for (const category of categories) {
            file.write('    <Category>' + category.name + '</Category>\n')
        }
        file.write('    <Currently>' + product.currentBid + '</Currently>\n')
        file.write('    <First_Bid>' + product.firstBid + '</First_Bid>\n')
        file.write('    <Number_Of_Bids>' + product.numberOfBids + '</Number_Of_Bids>\n')

        file.write('    <Bids>\n')
        const bids = await this.bidService.findAllBidsOnProduct(product);
        for (const bid of bids) {
                file.write('        <Bid>\n')
                    file.write('            <Bidder Rating="' + bid.bidder.bidderRating+'" UserID="' + bid.bidder.username + '">\n')
                        file.write('                <Location>'+ bid.bidder.location +'</Location>\n')
                        file.write('                <Country>'+ await this.countryService.getCountryNameById(bid.bidder.countryId) +'</Country>\n')
                    file.write('            </Bidder>\n')
                    file.write('            <Time>' + moment(bid.timeOfBid, 'x').format('MMM-DD-YY HH:MM:SS') + '</Time>\n')
                    file.write('            <Amount>' + bid.price + '</Amount>\n')
                file.write('        </Bid>\n')
            }
        file.write('    </Bids>\n')
        
        file.write('    <Location>' + product.location + '</Location>\n')
        file.write('    <Country>' + await this.countryService.getCountryNameById(product.seller.countryId) + '</Country>\n')
        file.write('    <Started>' + moment(product.startingDate, 'x').format('MMM-DD-YY HH:MM:ss') + '</Started>\n')
        file.write('    <Ends>' + moment(product.endingDate, 'x').format('MMM-DD-YY HH:MM:ss') + '</Ends>\n')
        file.write('    <Seller Rating="' + product.seller.sellerRating +'" UserID="' + product.seller.username + '"/>\n')
        file.write('    <Description>' + product.description + '\n')
        file.write('    </Description>\n')
    file.write('</Item>\n');
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
      await fs.unlink(filePath, (err) => {
        if (err) {
        console.error(err);
        return err;
        }
      });
      console.log('deleted ', filePath);
    }
  }

}