import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';
import { AppModule } from './app.module';
import {
  HttpExceptionsFilter,
  HttpTransformInterceptor,
  TimeoutInterceptor,
} from 'libs/middleware';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const accounts = process.env.SWAGGER_DOC_USER;
  app.use(
    ['/api'],
    basicAuth({
      challenge: true,
      users: JSON.parse(accounts),
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('API GATEWAY DOCUMENT')
    .setDescription('The API description of api gateway')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme('v3');
  const options = {
    customCss: theme.getBuffer('dark'),
  };
  SwaggerModule.setup('api', app, document, {
    ...options,
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Hepaders', 'Content-Type, Accept');
    next();
  });
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  app.useGlobalFilters(new HttpExceptionsFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new HttpTransformInterceptor());
  await app.listen(3000);
}
void bootstrap();
