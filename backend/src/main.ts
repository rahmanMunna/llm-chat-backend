import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  // Temporary check: is .env being read?
  const config = app.get(ConfigService);
  const key = config.get<string>('LLM_API_KEY', '');
  console.log('LLM_BASE_URL :', config.get('LLM_BASE_URL'));
  console.log('LLM_MODELS   :', config.get('LLM_MODELS'));
  console.log('LLM_API_KEY  :', key ? key.slice(0, 10) + '...(hidden)' : 'MISSING!');

  console.log(`Server running on http://localhost:${port}`);
}
await bootstrap();
