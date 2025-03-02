import { Injectable, Logger } from '@nestjs/common';
import { AbstractKafkaController } from '../../../../../common/kafka/abstract-kafka-controller';
import { Kafka } from 'kafkajs';
import { ISendChatWriter } from '../provider/send-chat.provider';
import { CreateNewChatModel } from '../models/create-new-chat.model';
import { CreateNewChatCreate } from '../../../../../common/kafka/models/create-new-chat.model';
import { EventType } from '../../../../../common/streams/event-type.model';

@Injectable()
export class SendChatKafkaService
  extends AbstractKafkaController
  implements ISendChatWriter
{
  private readonly logger: Logger = new Logger(SendChatKafkaService.name);
  private readonly kafka: Kafka;

  constructor() {
    super();
    this.kafka = new Kafka({ clientId: '', brokers: ['localhost:9092'] });
  }

  GetKafkaClient(): any {
    return this.kafka;
  }
  GetLogger(): Logger {
    return this.logger;
  }

  Events(): EventType[] {
    return [];
  }

  async createNewChat(value: CreateNewChatModel): Promise<boolean> {
    const data = new CreateNewChatCreate({ content: value.content });
    const res = await this.SendMessage('chat', {
      name: data.streamName(),
      data: data,
    });

    return res;
  }
}
