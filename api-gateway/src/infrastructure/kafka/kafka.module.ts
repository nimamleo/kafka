import { Module } from '@nestjs/common';
import { CHAT_WRITER } from './provider/send-chat.provider';
import { SendChatKafkaService } from './service/send-chat-kafka.service';

@Module({
  providers: [
    {
      provide: CHAT_WRITER,
      useClass: SendChatKafkaService,
    },
  ],
  exports: [CHAT_WRITER],
})
export class KafkaModule {}
