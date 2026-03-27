import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // tự động loại bỏ các trường không có trong DTO
      forbidNonWhitelisted: true, // nếu có trường không có trong DTO mà truyền lên thì trả về lỗi
      transform: true, // tự động chuyển đổi dữ liệu về đúng kiểu đã định nghĩa trong DTO
      transformOptions: {
        enableImplicitConversion: true, // Cho phép chuyển đổi kiểu dữ liệu tự động.
      },
      exceptionFactory: (validationError) => {
        return new UnprocessableEntityException(
          validationError.map((error) => ({
            field: error.property,
            errors: Object.values(error.constraints || {}).join(', '),
          })),
        );
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
