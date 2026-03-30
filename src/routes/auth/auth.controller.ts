import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { RegisterBodyDTO, RegisterResponseDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SerializeOptions({ type: RegisterResponseDTO }) // chuyển đổi đối tượng trả về thành RegisterResponseDTO
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    const result = await this.authService.register(body);
    return result;
  }
}
