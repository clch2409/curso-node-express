const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt')
const userService = require('../../../services/users.service')


const LocalStrategy = new Strategy({
    usernameField: "email"
  },
  async (email, password, done) => {
    try{
      const foundUser = await userService.getUserByEmail(email);

      if (!foundUser){
        done(boom.unauthorized('El usuario no existe'), false);
      }

      const passwordMatches = bcrypt.compare(password, foundUser.password);

      if (!passwordMatches){
        done(boom.unauthorized('La contraseña no coincide'), false);
      }

      done(null, foundUser);
    }
    catch(error){
      done(error, false)
    }
  }
);

module.exports = LocalStrategy
