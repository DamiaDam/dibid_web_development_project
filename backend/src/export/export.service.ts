import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
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

  async exportAllItems () {
    const products: ProductItem[] = await this.productService.getAllProducts();

    if ( !fs.existsSync('exports'))
        fs.mkdirSync('exports');

    var filename = 'exports/bids-' + new Date().toISOString() + '.xml';
    var file = fs.createWriteStream(filename, {
        flags: 'a'
    })

    for (const product of products) {
        await this.exportOneProduct(product, file);
    }

    file.end();

    return fs.readFileSync(filename, 'utf8').toString();

    // return (await getFile(filePath, 'utf8')).toString();

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
                        file.write('                <Country>'+ await this.countryService.getCountryNameById(bid.bidder.countryId) +'</Location>\n')
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
        file.write('    <Seller Rating="' + product.seller.sellerRating +'" UserID="' + product.seller.username + '">\n')
        file.write('    <Description>' + product.description + '\n')
        file.write('    </Description>\n')
    file.write('</Item>\n');
  }

}