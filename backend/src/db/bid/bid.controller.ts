import { Body, Controller, Get, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { BidService } from './bid.service';
import { Bid } from './bid.entity';
import { BidRequestDTO, BidResponseDTO, BidSubmitDTO } from 'src/dto/bid.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from '../user/user.service';
import { ProductItemService } from '../productItem/productItem.service';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService,
    private readonly usersService: UserService,
    private readonly productItemService: ProductItemService) {}

  // 'submitBid()' submits a bid using the post data
  @Post('/submit')
  @UseGuards(AuthGuard)
  async submitBid(@Body() req: BidRequestDTO): Promise<BidResponseDTO> {

    // get current product info
    const product = await this.productItemService.getProductEntityById(req.productId);

    // 1. check if bid is higher than current bid
    if (req.amount <= product.currentBid)
    {
      console.log('bid amount too low!');
      return {success: false}
    }
      
    // 2. check if bid is lower than max price
    if (req.amount > product.buyPrice)
    {
      console.log('bid amount exceeds buy price!');
      return {success: false}
    }

    // 3. check if bid is active or expired
    if (req.time > product.endingDate)
    {
      console.log('product auction has expired!');
      return {success: false}
    }

    var bid: Bid = new Bid();
    bid.product = product;
    bid.timeOfBid = req.time;
    bid.bidder = await this.usersService.findByUsername(req.bidder);
    bid.location = bid.bidder.location;
    bid.price = req.amount;

    await this.bidService.submitBid(bid);

    await this.productItemService.updateItemAfterBid(bid.product.productId, bid.price)

    return { success: true }
    
  }

}