import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useLiveMatch(matchId: string) {
  const [matchData, setMatchData] = useState<any>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to the NestJS Gateway
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}/live`, {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Connected to live match stream');
      newSocket.emit('subscribeToMatch', matchId);
    });

    newSocket.on('matchUpdate', (data) => {
      console.log('Live match update received:', data);
      setMatchData(data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [matchId]);

  return { matchData, socket };
}
