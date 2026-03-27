import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import { log } from 'console';
import fs from 'fs';
import path from 'path';
// Kiểm tra cem đã có file .env chưa

if (!fs.existsSync(path.resolve(process.cwd(), '.env'))) {
  log('không tìm thấy file .env');
  process.exit(1);
}

class ConfigSchema {
  @IsString()
  DATABASE_URL!: string;
  @IsString()
  PORT!: string;
  @IsString()
  ACCESS_TOKEN_SECRET!: string;
  @IsString()
  ACCESS_TOKEN_EXPIRES_IN!: string;
  @IsString()
  REFRESH_TOKEN_SECRET!: string;
  @IsString()
  REFRESH_TOKEN_EXPIRES_IN!: string;
}

const configServer = plainToInstance(ConfigSchema, process.env, {
  enableImplicitConversion: true, // Cho phép chuyển đổi kiểu dữ liệu tự động (ví dụ: từ string sang number nếu cần)
});
const e = validateSync(configServer);

if (e.length > 0) {
  log('cấu hình không hợp lệ', e);
  const errors = e.map((err) => {
    return {
      property: err.property,
      constraints: err.constraints,
      value: err.value,
    };
  });
  throw errors;
}

const envConfig = configServer;

export default envConfig;
