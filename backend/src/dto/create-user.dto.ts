export interface CreateUserDTO {
    username: string,
    password: string,
    email: string,
    name: string,
    surname: string,
    phone: string,
    tin: string,
    country: string,
    address: string,
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
    country: string,
    address: string,
    validated: boolean,
    longitude?: number,
    latitude?: number;
}

export interface GetUserResponseDTO {
    exists: boolean,
    info?: UserInfoDTO;
}