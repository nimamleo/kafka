import { Logger } from "@nestjs/common";
import { Kafka, Producer, Consumer } from "kafkajs";

export abstract class AbstractKafkaController {
  abstract GetKafkaClient(): Kafka;
  abstract GetLogger(): Logger;

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

  async SendMessage<T>(topic: string, data: T): Promise<boolean> {
    try {
      const producer = await this.GetProducer();
      await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(data) }],
      });

      return true;
    } catch (e) {
      this.GetLogger().error(`Failed to send message: ${JSON.stringify(e)}`);
    }
  }

  async GetConsumer(): Promise<Consumer> {
    try {
      const consumer = this.GetKafkaClient().consumer({ groupId: "" });
      await consumer.connect();
      return consumer;
    } catch (e) {
      this.GetLogger().error(`Failed to get consumer: ${JSON.stringify(e)}`);
    }
  }

  async ConsumeMessage() {
    const consumer = await this.GetConsumer();
    await consumer.subscribe({ topic: "", fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, message, partition }) => {
        console.log({ topic });
        console.log({ partition });
        console.log({ message: message.value.toString() });
      },
    });
  }
}
