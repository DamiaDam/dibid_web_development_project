// export interface registrationResponseDTO {
//     did: string;
//     ebsi_access_token: string;
//     apptoken: string;
// }

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
    country: string,
    address: string;
}

export interface RegisterResponseDTO {
    success: boolean
}

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

export interface UserInfoDTO {
    username: string,
    email: string,
    name: string,
    surname: string,
    phone: string,
    tin: string,
    country: string,
    address: string,
    validated: boolean,
    admin: boolean,
    longitude?: number,
    latitude?: number;
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

export interface SubmitBidDTO {
    productId: number,
    time: number,
    amount: number,
    bidder: string;
}

export interface DropdownItemInterface {
    key: string;
    value: string;
}