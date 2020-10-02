import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MYValidationPipe } from './pipes/validation/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const PREFIX = 'nest-passport-sso-demo';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new MYValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('nest framework  api文档')
    .setDescription('nest framework  api接口文档')
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'Authorization' })
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${PREFIX}`, app, document); //这里是swagger的路径
  console.log('3000', 'ok');
  await app.listen(3000);
}
bootstrap();
