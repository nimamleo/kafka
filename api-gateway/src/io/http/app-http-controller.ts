import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  CHAT_WRITER,
  ISendChatWriter,
} from '../../infrastructure/kafka/provider/send-chat.provider';
import { CreateChatRequest } from './models/create-chat.model';

@Controller('chat')
export class AppHttpController {
  constructor(
    @Inject(CHAT_WRITER)
    private readonly writer: ISendChatWriter,
  ) {}

  @Post()
  async createNewChat(@Body() body: CreateChatRequest) {
    const res = await this.writer.createNewChat({ content: body.content });
    return res;
  }
}
