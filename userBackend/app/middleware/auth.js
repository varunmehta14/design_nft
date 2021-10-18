const jwt = require('jsonwebtoken');

const config = require("../config/auth.config.js");
const db = require('../models');

const User = db.users;
const Op = db.Sequelize.Op;
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
   console.log("decoded",decoded.id);
   console.log(User);
    if (!decoded) {
      console.log("here");
      return res.status(401).json({
        msg: 'Invalid token',
      });
    }
    //condition to check expired
    var condition = decoded.id ? { userAddress: { [Op.like]: `%${decoded.id}%` } } : null;
    console.log("condtion",condition);
    let user =  User.findAll({where:condition}).then(data=>{console.log(data)}).catch(err => {console.log(err)});
    console.log("here");
    console.log("user",user);
    if (user.length==0) {
      return res.status(404).json(`User not found!`);
    }

    req.token = token;
    req.user = user[0];
    res.locals.user = user[0];
    next();
  
  } 

catch (e) {
  console.log(e)
    return res.status(401).json({
      msg: 'Invalid token',
    });
  }
  
};

module.exports = { authRequired };