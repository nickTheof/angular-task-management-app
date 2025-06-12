export interface UserForgotPasswordDTO {
  username: string;
}

export interface LoginUserDTO extends UserForgotPasswordDTO {
  password: string;
}

export interface RegisterUserDTO extends LoginUserDTO {
}

export type RegisterUserResponse = {
  id: number;
  uuid: string;
  username: string;
  isActive: boolean;
  role: "ADMIN" | "USER";
}

export interface ForgotPasswordResponse {
  Status: number;
  message: string;
}

export type ResetPasswordDTO = {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse extends  ForgotPasswordResponse {}
