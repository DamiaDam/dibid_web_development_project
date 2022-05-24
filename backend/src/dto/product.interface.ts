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
    exists: boolean;
    productId: number;
    imgUrl: string;
    name: string;
    price: number;
    description: string;
}