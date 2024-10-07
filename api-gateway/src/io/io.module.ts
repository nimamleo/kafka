import { Module } from '@nestjs/common';
import { AppHttpController } from './http/app-http-controller';
import { KafkaModule } from '../infrastructure/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [AppHttpController],
})
export class IoModule {}
