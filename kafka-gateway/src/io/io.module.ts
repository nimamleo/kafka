import { Module } from '@nestjs/common';
import { CreateChatKafkaController } from './kafka/create-chat-kafka.controller';

@Module({
  controllers: [CreateChatKafkaController],
})
export class IoModule {}
