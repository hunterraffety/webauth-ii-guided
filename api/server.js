const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

// session config object. keep hidden irl.
const sessionConfig = {
  name: 'mordor',
  secret: 'keep it secret, keep it safe',
  cookie: {
    maxAge: 1000 * 60 * 10, // milliseconds,
    secure: false, // true in production, only https for cookies,
    httpOnly: true // js can't access the cookie on the client
  },
  resave: false, // save the session again even if it didn't change
  saveUninitialized: true
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig)); // turn on sessions

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
