const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const User = require('./models/user.js');
require('dotenv').config({ path: path.resolve(__dirname, './config/index.env') });
// require('dotenv').config({path: './config/index.env'})

const PORT = process.env.PORT || 5000;
console.log(process.env.MONGO_URL);

// //MongoDB
const connectDB = require('./config/db');
connectDB();

// routes
const authRoutes = require('./routes/auth.js');
const postRoutes = require('./routes/post.js');
const userRoutes = require('./routes/user.js');
const notificationRoutes = require('./routes/notification.js');

// app.use(logger("dev"));
app.use(
  cors({
    exposedHeaders: '*',
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);

app.use('/public/', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/notification', notificationRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'success oke',
  });
});

//Page Not founded
app.use((req, res) => {
  res.status(404).json({
    msg: 'Page not founded',
  });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connecting`);
  socket.on('disconnect', () => {
    console.log('user disconnected: ', socket.id);
  });

  socket.on('like_post', (data) => {
    io.emit('getNoti', data);
  });

  socket.on('comment_post', (data) => {
    io.emit('getNoti', data);
  });
  socket.on('follow_user', (data) => {
    console.log('follow');
    io.emit('getNoti', data);
  });
  socket.on('report_post', (data) => {
    io.emit('getNoti', data);
  }) 

  socket.on('report_user', (data) => {
    io.emit('getNoti', data);
  }) 
});

server.listen(PORT, () => {
  console.log('Server on running on PORT ' + PORT);
});
