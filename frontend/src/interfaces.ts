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
    email: string;
    phone: string;
    tin: string;
    country: string;
    address: string;
}

export interface RegisterResponseDTO {
    success: boolean
}