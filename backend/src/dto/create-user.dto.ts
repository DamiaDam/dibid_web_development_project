export interface CreateUserDTO {
    username: string,
    password: string,
    email: string,
    name: string,
    surname: string,
    phone: string,
    tin: string,
    countryId: number,
    address: string,
    location: string,
    longitude: number,
    latitude: number;
}

export interface UserInfoDTO {
    username: string,
    email: string,
    name: string,
    surname: string,
    phone: string,
    tin: string,
    countryId: number,
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