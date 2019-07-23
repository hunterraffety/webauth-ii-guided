const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

module.exports = server => {
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
    saveUninitialized: true,
    store: new KnexSessionStore({
      knex: require('../database/dbConfig.js'),
      tablename: 'sessions',
      createtable: true,
      sidfieldname: 'sid',
      clearInterval: 1000 * 60 * 60 // deletes expired sessions every hour
    })
  };

  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig)); // turn on sessions
};
