const jwt = require('jsonwebtoken');

const config = require("../config/auth.config.js");
const db = require('../models');

const User = db.users;

/**
 * Requires a token in request headers.
 * Header format is
 * Authorization: Bearer token
 */
const authRequired = () => async (req, res, next) => {
  const header = req.header('Authorization');
   
  if (!header) {
    return res.status(401).json({
      msg: 'Please Provide JWT',
    });
  }
  
  const token = header.replace('Bearer', '').trim();
  try {
    const decoded = jwt.verify(token, config.secret);
   
    if (!decoded) {
      return res.status(401).json({
        msg: 'Invalid token',
      });
    }
   
    let user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(404).json(`User not found!`);
    }

    req.token = token;
    req.user = user;
    res.locals.user = user;
    next();
  
  } catch (e) {
    return res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

module.exports = { authRequired };