export interface registrationRequestDTO {
  eosToken: string;
  password: string;
}


export interface loginRequestDTO {
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