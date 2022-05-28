export interface ProductProps {
    imgUrl: string;
    name: string;
    startingPrice: number;
    buyNowPrice?: number;
    startingDate: number;
    endDate: number;
    location: string;
    longitude?: number;
    latitude?: number;
    description: string;
    user: string;
}

export interface ProductResponse {
    productId: number;
    name: string;
    imgUrl: string;
    currentBid: number;
    buyPrice: number;
    firstBid: number;
    numberOfBids: number;
    startingDate: number;
    endingDate: number;    
    description: string;
    location: string;
    longitude?: number;
    latitude?: number;
}