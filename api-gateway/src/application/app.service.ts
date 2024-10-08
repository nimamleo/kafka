import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly kafka = new Kafka({ brokers: ['localhost:9092'] });
  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async test(record: ProducerRecord) {
    await this.producer.send(record);
  }
}
