import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'Elena', text: 'Hola' }];
  clientToUser = {};
  // TODO: guardar usuarios y mensajes en base de datos

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser); // podría mostrar los nombres de los ususarios conectados
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    this.messages.push(message); // TODO: identificar usuario por nombre
    return message;
  }

  findAll() {
    return this.messages;
  }
}
