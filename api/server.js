const express = require('express');
const cors = require('cors')
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(cors())
// global middlewares and the user's router need to be connected here
const userRouter = require('./users/users-router')

server.use('/api/users',userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use((err, req, res, next) => { // eslint-disable-line
  // DO NOT DELETE NEXT FROM YOUR ERR HANDLING MIDDLEWARE
  console.log('', err.message)
  res.status(err.status || 500).json({
    custom: 'something exploded inside the app',
    message: err.message,
    stack: err.stack,
  })
});
module.exports = server;
