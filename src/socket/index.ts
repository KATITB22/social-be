import {Server} from 'socket.io';
import {ClientToServerEvents, ServerToClientEvents} from './interface';
import authMiddleware from '../middleware/auth.middleware';

function socket({
  io,
}: {
  io: Server<ClientToServerEvents, ServerToClientEvents>;
}) {
  console.log('🖥️ Sockets enabled');

  io.use((socket, next) => {
    authMiddleware.authSocketMiddleware(socket, next);
  })

  io.on('connection', socket => {
    console.log(`🟩 User connected ${socket.id}`);

    // Emit events
    socket.emit('noArg');
    socket.emit('basicEmit', 1, 'hello');
    socket.emit('withAck', 'str', num => {
      if (typeof num === 'number') {
        console.log('Definitely true');
      }
    });

    // Listen events
    socket.on('hello', () => {
      console.log('Hello from client');
    });
  });
}

export default socket;
