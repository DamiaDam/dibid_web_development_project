export interface ProductProps {
    imgUrl:  string;
    name: string;
    price: number;
    description: string;
    productUrl: string;
}

export interface ProductResponse {
    exists: boolean;
    productId: number;
    imgUrl:  string;
    name: string;
    price: number;
    description: string;
    productUrl: string;
}