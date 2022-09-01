import { User } from "src/db/user/user.entity";

export interface BidRequestDTO {
    productId: number,
    time: number,
    amount: number,
    bidder: string;
}

export interface BidSubmitDTO {
    productId: number,
    time: number,
    amount: number,
    bidder: User;
}

export interface BidResponseDTO {
    success: boolean;
}

export interface BidInterface {
    bidId: number;
    price: number;
    bidder: string;
    timeOfBid: number;
    location: string;
}