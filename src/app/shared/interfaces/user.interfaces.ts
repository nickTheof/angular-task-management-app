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

export type ForgotPasswordResponse = {
  Status: number;
  message: string;
}
