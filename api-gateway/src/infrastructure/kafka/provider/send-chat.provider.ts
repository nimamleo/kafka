import { CreateNewChatModel } from '../models/create-new-chat.model';

export interface ISendChatWriter {
  createNewChat(value: CreateNewChatModel): Promise<boolean>;
}

export const CHAT_WRITER = 'chat-writer';
