import { Logger } from "@nestjs/common";
import { Kafka, Producer, Consumer } from "kafkajs";
import { EventType } from "../streams/event-type.model";
import { Message } from "../streams/message.model";

export abstract class AbstractKafkaController {
  abstract GetKafkaClient(): Kafka;
  abstract GetLogger(): Logger;
  abstract Events(): EventType[];

  async GetProducer(): Promise<Producer> {
    try {
      const producer = this.GetKafkaClient().producer();
      await producer.connect();
      return producer;
    } catch (e) {
      console.log(e);
      this.GetLogger().error(
        `Failed to connect to Kafka with error ${JSON.stringify(e)}`,
      );
    }
  }

  async SendMessage<T>(topic: string, data: Message<T>): Promise<boolean> {
    try {
      const producer = await this.GetProducer();
      await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(data) }],
      });
      await producer.disconnect();

      return true;
    } catch (e) {
      this.GetLogger().error(`Failed to send message: ${JSON.stringify(e)}`);
    }
  }

  async GetConsumer(): Promise<Consumer> {
    try {
      const consumer = this.GetKafkaClient().consumer({ groupId: "1" });
      await consumer.connect();
      return consumer;
    } catch (e) {
      this.GetLogger().error(`Failed to get consumer: ${JSON.stringify(e)}`);
    }
  }

  async ConsumeMessage(topic: string) {
    const consumer = await this.GetConsumer();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, message, partition }) => {
        const msg = JSON.parse(message.value.toString());
        const event = this.Events().find((x) => x.name == msg.name);
        event.payload(msg);
      },
    });
  }
}
