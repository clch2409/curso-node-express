const boom = require('@hapi/boom');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const userService = require('./users.service')
const config = require('./../../config/config');

class AuthService{

  async checkUsersCredentials(email, password){
    const foundUser = await userService.getUserByEmail(email);

    if (!foundUser){
      throw boom.unauthorized('El usuario no existe');
    }

    const passwordMatches = await bcrypt.compare(password, foundUser.dataValues.password);

    if (!passwordMatches){
      throw boom.unauthorized('La contraseña no coincide');
    }

    delete foundUser.dataValues.password;
    delete foundUser.dataValues.recoveryToken;

    return foundUser;
  }

  signToken(user){
    const jwtConfig = {
      expiresIn: '20min'
    }

    const payload = {
      sub: user.id,
      role: user.role,
    }
    const token = jwt.sign(payload, config.jswtSecret, jwtConfig);

    return token;
  }

  async changePassword(token, newPassword){
    try{
      const payload = await jwt.verify(token, config.jswtSecretRecovery);
      const user = await userService.getUserById(payload.sub);

      if (user.recoveryToken !== token){
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);
      await userService.updateUser(user.dataValues.id, {
        recoveryToken: null,
        password: hash,
      })

      return {
        message: 'password changed'
      }
    }catch(e){
      throw boom.unauthorized()
    }

  }

  async getMailInfo(userId){
    const user = await userService.getUserById(userId);
    if (!user){
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.dataValues.id
    }
    const recoveryToken = jwt.sign(payload, config.jswtSecretRecovery, {
      expiresIn: '15min'
    });

    await userService.updateUser(user.dataValues.id, {
      recoveryToken
    });

    const mail = {
      from: config.senderEmail,
      to: user.dataValues.email,
      subject: 'Recuperación de contraseña',
      html: `<b> ${recoveryToken} </b>`
    }

    const mailSent = await this.senMail(mail);
    return mailSent;
  }

  async senMail(mailInfo){
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.senderEmail,
        pass: config.senderPassword,
      },
    });


    await transporter.sendMail(mailInfo);

    return { message: 'email sent' };
  }
}


module.exports = new AuthService();
