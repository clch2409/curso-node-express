const express = require('express');
const passport = require('passport');
const authService = require('./../services/auth.service');
const usersService = require('../services/users.service');

const authRouter = express.Router();


authRouter.post('/login',
  passport.authenticate('local',{
    session: false
  }), loginUser);

authRouter.post('/recovery',
passport.authenticate('jwt',{
  session: false
}), recoveryUser);

authRouter.post('/change/password',
changePassword);

async function loginUser(req, res, next){
  try {
    const user = req.user;
    const token = authService.signToken(user);

    res.json({
      user,
      token
    })

  } catch (error) {
    next(error)
  }
}

async function recoveryUser(req, res, next){
  try{
    const user = req.user;
    const emailSent = await authService.getMailInfo(user.sub);
    res.json(emailSent);
  }
  catch(e){
    next(e)
  }
}

async function changePassword(req, res, next){
  try{
    const { token, password } = req.body;
    const rta = await authService.changePassword(token, password);
    res.json(rta);
  }
  catch(e){
    next(e)
  }
}

module.exports = authRouter;
