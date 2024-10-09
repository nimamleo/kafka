import { IEvent } from "../../streams/event.interface";

export class CreateNewChatCreate implements IEvent {
  content: string;

  constructor(init?: Partial<CreateNewChatCreate>) {
    Object.assign(this, init);
  }

  streamName(): string {
    return "kafka:create-chat:create";
  }
}

export class CreateNewChatCreated {}
