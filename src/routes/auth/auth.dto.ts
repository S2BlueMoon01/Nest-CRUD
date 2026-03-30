import { Exclude } from 'class-transformer';
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

export class RegisterResponseDTO {
  id!: number;
  email!: string;
  name!: string;

  @Exclude()
  password!: string;

  createdAt!: Date;
  updatedAt!: Date;

  // trường hợp muốn trả về một trường mới được tính toán dựa trên email, ví dụ: emailName (phần trước dấu @ của email)
  // @Expose()
  // get emailName() {
  //   return this.email.split('@')[0];
  // }

  constructor(partial: Partial<RegisterResponseDTO>) {
    Object.assign(this, partial);
  }
}
