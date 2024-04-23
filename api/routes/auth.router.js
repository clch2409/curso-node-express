const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();
const config = require('./../../config/config');


authRouter.post('/login',
  passport.authenticate('local',{
    session: false
  }), loginUser);

async function loginUser(req, res, next){
  try {
    const user = req.user;

    const jwtConfig = {
      expiresIn: 120
    }

    const payload = {
      sub: user.id,
      role: user.role,
    }
    const token = jwt.sign(payload, config.jswtSecret, jwtConfig);

    res.json({
      user,
      token
    })

  } catch (error) {
    next(error)
  }
}

module.exports = authRouter;
