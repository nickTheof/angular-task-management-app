export interface UserForgotPasswordDTO {
  username: string;
}

export interface LoginUserDTO extends UserForgotPasswordDTO {
  password: string;
}

export interface RegisterUserDTO extends LoginUserDTO {
}
