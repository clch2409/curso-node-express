const { Strategy } = require('passport-local');
const authService = require('./../../../services/auth.service');


const LocalStrategy = new Strategy({
    usernameField: "email"
  },
  async (email, password, done) => {
    try{
      const foundUser = await authService.checkUsersCredentials(email, password);

      done(null, foundUser);
    }
    catch(error){
      done(error, false)
    }
  }
);

module.exports = LocalStrategy
