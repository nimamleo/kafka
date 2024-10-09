import { NestFactory } from '@nestjs/core';
import { CreateChatKafkaController } from './io/kafka/create-chat-kafka.controller';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.createMicroservice(AppModule);

  const createChatKafka = await app.resolve<CreateChatKafkaController>(
    CreateChatKafkaController,
  );

  await createChatKafka.ConsumeMessage('chat');

  await app.listen();
}

main();
