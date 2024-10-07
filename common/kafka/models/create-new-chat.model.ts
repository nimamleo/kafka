export class CreateNewChatCreate {
  content: string;

  constructor(init?: Partial<CreateNewChatCreate>) {
    Object.assign(this, init);
  }
}

export class CreateNewChatCreated {}
