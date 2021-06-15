import jwt from 'jsonwebtoken';
import config from './config';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET
  );
};


//middleware method for authentication 

export const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(401).send({ message: 'Token is not supplied' });  //if bearerToken not exist
  } 
  //if bearertoekn exist
  else {
    const token = bearerToken.slice(7, bearerToken.length);  //cut from space that token
    //use jwt verify method for verify secret key if their is an error it means invalid token
    jwt.verify(token, config.JWT_SECRET, (err, data) => {        
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } 
      //
      else {
        req.user = data;  // what is data here --> the data is incoded token like user name, user pass, user info. etc
        next();           //next means when everything goes well we call next it means next handler should start processing this.
      }
    });
  }
};