export interface LoginRequestDTO {
    username: string;
    password: string;
}

export interface LoginResponseDTO {
    username: string;
    apptoken: string;
}

export type LocationProps = {
    state: {
        path: Location;
    };
};

export interface RegisterDTO {
    username: string,
    password: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    tin: string,
    countryId: number,
    address: string,
    location: string,
    longitude: number,
    latitude: number
}

export interface RegisterResponseDTO {
    success: boolean
}

export interface ProductProps {
    imgUrl: string;
    categories: number[];
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
    seller: string;
    sellerRating: number;
    categories: CategoryInterface[];
}

export interface UserInfoDTO {
    username: string,
    email: string,
    name: string,
    surname: string,
    phone: string,
    tin: string,
    countryId?: string,
    country?: string,
    address: string,
    validated: boolean,
    admin: boolean,
    bidderRating: number,
    sellerRating: number,
    longitude?: number,
    latitude?: number;
}

export interface UsersChatResponseDTO {
    myChatsUsernames: string[] //Array of usernames
}

export interface GetUserResponseDTO {
    exists: boolean,
    info?: UserInfoDTO;
}

export interface ValidateResponseDTO {
    success: boolean
}

export interface ValidateDTO {
    username?: string
}

export interface MapCoordsDTO {
    lat: number,
    lng: number;
}

export interface LocationMarkerProps {
    position: MapCoordsDTO | null,
    setPosition: (position: MapCoordsDTO | null) => void;
}

export interface StaticMapProps {
    position: MapCoordsDTO;
}

export interface SubmitBidDTO {
    productId: number,
    time: number,
    amount: number,
    bidder: string;
}

export interface DropdownItemInterface {
    key: number;
    value: string;
}

export interface CategoryInterface {
    id: number;
    name: string;
}

export interface SelectInterface {
    value: string,
    label: string
}

export interface SearchProductInterface {
    searchText?: string,
    category?: number,
    minBid?: number,
    maxBid?: number,
    minBuyNow?: number,
    maxBuyNow?: number,
    pageNumber?: number,
    pageSize?: number
}

export interface AddProductItemI {
    productId?: number;
    maxBuyNow?: number
}

export interface Message {
    messageId: number;
    messageText: string;
    timeStamp: Date;
    sent: boolean;
}

export interface chatDTO {
    senderUsername: string;
    receiverUsername: string;
}

export interface chatResponseDTO {
    messages: Message[];
}

export interface sendMessagesDTO {

    messageText: string;
    senderUsername: string;
    receiverUsername: string;
}

export interface sendMessagesResponseDTO {
    success: boolean;
}

export interface ActionCardI {
    onClick: () => void;
    image: any;
    title: string;
    text: string;
}