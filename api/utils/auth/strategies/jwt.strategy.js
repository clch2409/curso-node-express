const { Strategy, ExtractJwt,  } = require('passport-jwt');

const config = require('./../../../../config/config.js')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jswtSecret,

}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
})

module.exports = JwtStrategy;
