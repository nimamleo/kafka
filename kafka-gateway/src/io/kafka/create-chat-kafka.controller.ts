import { Controller, Logger } from '@nestjs/common';
import { AbstractKafkaController } from '../../../../common/kafka/abstract-kafka-controller';
import { Kafka } from 'kafkajs';
import { EventType } from '../../../../common/streams/event-type.model';
import { CreateNewChatCreate } from '../../../../common/kafka/models/create-new-chat.model';
import { Message } from '../../../../common/streams/message.model';

@Controller()
export class CreateChatKafkaController extends AbstractKafkaController {
  private readonly logger = new Logger(CreateChatKafkaController.name);
  private readonly kafka: Kafka;

  constructor() {
    super();
    this.kafka = new Kafka({ brokers: ['localhost:9092'] });
  }

  GetLogger(): Logger {
    return this.logger;
  }

  GetKafkaClient(): Kafka {
    return this.kafka;
  }

  Events(): EventType[] {
    return [
      {
        name: new CreateNewChatCreate().streamName(),
        payload: (data) => this.createCHat(data),
      },
    ];
  }

  async createCHat(data: Message<CreateNewChatCreate>) {
    console.log(data.data.content);
    console.log(`new chat created ${data.data.content}`);
  }
}
