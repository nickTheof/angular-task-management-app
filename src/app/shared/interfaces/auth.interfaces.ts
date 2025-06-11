export interface LoggedInUser {
  "role": "ADMIN" | "USER",
  "sub": string,
}

export interface DecodedToken extends LoggedInUser {
  "iss": string,
  "iat": number,
  "exp": number,
}

export interface LoginResponse {
  token: string;
}
