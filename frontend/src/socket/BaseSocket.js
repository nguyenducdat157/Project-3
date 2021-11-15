import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

export const connect = () => {
  return io.connect('http://localhost:5000');
};

export const likePost = () => {
  connect().emit('like', 'hieu');
};
