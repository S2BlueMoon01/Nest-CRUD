import { IsString } from 'class-validator';

export class LoginBodyDTO {
  @IsString()
  email: string;
  @IsString()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString({ message: 'Tên phải là chuỗi' })
  name: string;
  @IsString()
  confirmPassword: string;

  constructor(
    email: string,
    password: string,
    name: string,
    confirmPassword: string,
  ) {
    super(email, password);
    this.name = name;
    this.confirmPassword = confirmPassword;
  }
}
