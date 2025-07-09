import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

//  app.enableCors({
//     origin: [
//       'http://localhost:4200',
//       'https://tracker-ui-6umi.vercel.app'
//     ],
//     credentials: true,
//   });


app.enableCors({
  origin: [
    'http://localhost:4200',
    'https://tracker-ui-5pmj.vercel.app/login' 
  ],
  credentials: true,
});





 app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', 
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
