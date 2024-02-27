import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'Admin', text: 'Bienvenido al grupo!' }];
  clientToUser = {};
  // TODO: guardar usuarios y mensajes en base de datos

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser); // podría mostrar los nombres de los ususarios conectados
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
    };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }
}
