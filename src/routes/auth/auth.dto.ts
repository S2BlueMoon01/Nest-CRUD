import { Exclude, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { SuccessResDTO } from 'src/shared/shared.dto';

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

class RegisterData {
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

  constructor(partial: Partial<RegisterData>) {
    Object.assign(this, partial);
  }
}

export class RegisterResponseDTO extends SuccessResDTO {
  @Type(() => RegisterData)
  declare data: RegisterData;

  constructor(partial: Partial<RegisterResponseDTO>) {
    super(partial);
    Object.assign(this, partial);
  }
}
