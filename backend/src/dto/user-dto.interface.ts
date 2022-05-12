export interface registrationRequestDTO {
  eosToken: string;
  password: string;
}


export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface AuthorizedI {
  authorized: string; // "true" or "false"
}

export interface AuthnRequestI {
  redirectUrl: string;
  did: string;
  password: string;
  presentation: string;
}

export interface ValidateResponseDTO {
  success: boolean
}

export interface ValidateDTO {
  username?: string
}