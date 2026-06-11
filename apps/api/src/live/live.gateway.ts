import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Redis } from '@upstash/redis';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/live',
})
export class LiveGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(LiveGateway.name);
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribeToMatch')
  handleSubscribe(client: Socket, matchId: string) {
    client.join(`match_${matchId}`);
    this.logger.log(`Client ${client.id} joined room match_${matchId}`);
    return { event: 'subscribed', data: matchId };
  }

  // Example method to broadcast a live event
  broadcastLiveEvent(matchId: string, event: any) {
    this.server.to(`match_${matchId}`).emit('matchUpdate', event);
    
    // Also log it in Redis for caching recent events
    this.redis.lpush(`match_${matchId}_events`, JSON.stringify(event));
  }
}
