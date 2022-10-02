import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards, Headers } from '@nestjs/common';
import { BidService } from './bid.service';
import { Bid } from './bid.entity';
import { BidInterface, BidRequestDTO, BidResponseDTO, BidSubmitDTO } from 'src/dto/bid.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from '../user/user.service';
import { ProductItemService } from '../productItem/productItem.service';

@Controller('bid')
export class BidController {
  authService: any;
  constructor(private readonly bidService: BidService,
    private readonly usersService: UserService,
    private readonly productItemService: ProductItemService) { }

  // 'submitBid()' submits a bid using the post data
  @Post('/submit')
  @UseGuards(AuthGuard)
  async submitBid(@Body() req: BidRequestDTO): Promise<BidResponseDTO> {

    // get current product info
    const product = await this.productItemService.getProductEntityById(req.productId);

    // 1. check if bid is higher than current bid
    if (req.amount <= product.currentBid) {
      console.log('bid amount too low!');
      return { success: false }
    }

    // 2. check if bid is lower than max price
    if (req.amount > product.buyPrice) {
      console.log('bid amount exceeds buy price!');
      return { success: false }
    }

    // 3. check if bid is active or expired
    if (req.time > product.endingDate) {
      console.log('product auction has expired!');
      return { success: false }
    }

    var bid: Bid = new Bid();
    bid.product = product;
    bid.timeOfBid = req.time;
    bid.bidder = await this.usersService.findByUsername(req.bidder);
    bid.location = bid.bidder.location;
    bid.price = req.amount;

    await this.bidService.submitBid(bid);

    await this.usersService.increaseBidderRating(bid.bidder);

    await this.productItemService.updateItemAfterBid(bid.product.productId, bid.price, req.bidder);

    return { success: true }

  }

  @Get('/product/:productId')
  async getBidsByProductId(
    @Param('productId') productId: string
  ): Promise<BidInterface[]> {
    const bids: Bid[] = await this.bidService.findAllBidsOnProductId(productId);

    const bidItems: BidInterface[] = [];

    for (const bid of bids) {
      let bidItem: BidInterface = {
        bidId: bid.bidId,
        bidder: bid.bidder.username,
        location: bid.location,
        price: bid.price,
        timeOfBid: bid.timeOfBid
      };

      bidItems.push(bidItem)
    }

    return bidItems;
  }

  @Get('/bids/:auctionType')
  @UseGuards(AuthGuard)
  async getAuction(
    @Param('auctionType') auctionType: string,
    @Headers('authorization') headers
  ): Promise<number[] | boolean> {
    let token: string = ""
    try {
      token = headers.split(" ")[1];
    }
    catch (err) {
      console.log(err);
      return [];
    }
    const username = this.authService.getUsername(token);
    if (auctionType === 'won') {
      return await this.bidService.getAllBidedWonProducts(username);
    } else if (auctionType === 'all') {
      return await this.bidService.getAllBidedProducts(username);
    }
    else if (auctionType === 'active') {
      return await this.bidService.getAllBidedStillActiveProducts(username);
    }
    else {
      return false;
    }
  }
}