import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('mensaje')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log(data);
    client.broadcast.emit('mensajeserver', data);
  }

  @SubscribeMessage('onNewUser')
  handleNewUser(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log(data);
    client.broadcast.emit('onNewUser', data);
    // conectarse a la base de datos
    // guardar usuario
  }
}