const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

/**
  Do what needs to be done to support sessions with the `express-session` package!
  To respect users' privacy, do NOT send them a cookie unless they log in.
  This is achieved by setting 'saveUninitialized' to false, and by not
  changing the `req.session` object unless the user authenticates.

  Users that do authenticate should have a session persisted on the server,
  and a cookie set on the client. The name of the cookie should be "chocolatechip".

  The session can be persisted in memory (would not be adecuate for production)
  or you can use a session store like `connect-session-knex`.
 */

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

const User = require('./users/users-model.js')

server.get('/api', (req, res) => {
  User.find()
    .then(users => {
      res.json(users)
    })
})

server.get('/api/users/:id', (req, res) => {
  console.log(req.params.id)

  User.findBy(req.params.id)
    .then(user => {
      res.json(user)
    })
})

server.post('/api/users', async (req, res, next) => {
  try {
    const newUser = await User.add(req.body)

    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

// server.get("/", (req, res) => {
//   res.json({ api: "up" });
// });

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
