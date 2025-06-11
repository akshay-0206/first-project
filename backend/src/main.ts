import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  UnprocessableEntityException,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname,'..','public'), {
    index:false,
    prefix: '/public',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new UnprocessableEntityException({
          status: false,
          message: 'Something went wrong!',
          data: errors.reduce((prev, next) => {
            if (next.constraints) {
              prev[next.property] = Object.values(next.constraints).map(
                (msg: string) => {
                  const firstChar = msg.charAt(0).toUpperCase();
                  const remainingChars = msg.slice(1);
                  return `${firstChar}${remainingChars}`;
                },
              )[0];
            } else if (next.children && next.children.length > 0) {
              prev[next.property] = next.children
                .map((child) =>
                  child.constraints
                    ? Object.values(child.constraints)[0]
                    : 'Invalid nested object',
                )
                .join(', ');
            } else {
              prev[next.property] = 'Validation failed';
            }
            return prev;
          }, {}),
        }),
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
