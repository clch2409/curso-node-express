const express = require('express');
const authRouter = express.Router();
const passport = require('passport');


authRouter.post('/login',
  passport.authenticate('local',{
    session: false
  }), loginUser);

async function loginUser(req, res, next){
  try {
    res.json(req.user)
  } catch (error) {
    next(error)
  }
}

module.exports = authRouter;
