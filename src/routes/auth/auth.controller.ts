import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { RegisterBodyDTO, RegisterResponseDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /* @SerializeOptions({ type: RegisterResponseDTO }) 
   chuyển đổi đối tượng trả về thành RegisterResponseDTO
   *NOTE: không hoạt động khi dùng interceptor chuyển đổi dữ liệu trả về toàn cục
   */
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    console.log('controller...');
    const result = await this.authService.register(body);
    // return new RegisterResponseDTO(result);
    return result;
  }
}
