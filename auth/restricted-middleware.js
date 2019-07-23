const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ message: 'You shall not pass.' });
  }

  const { username, password } = req.headers;
  // check that the client has a session
  // if there is a session, go
  // no session, bye

  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: 'Invalid Credentials' });
  //       }
  //     })
  //     .catch(error => {
  //       res.status(500).json({ message: 'Ran into an unexpected error' });
  //     });
  // } else {
  //   res.status(400).json({ message: 'No credentials provided' });
  // }
};
