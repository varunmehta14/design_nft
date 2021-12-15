const db = require("../models");
const config = require("../config/auth.config");

const User = db.users;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");

// Create and Save a new User
exports.create = (req, res) => {

   // Validate request
    //console.log("req",req.body)
   if (!req.body.userName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
   }
   console.log(req.body)
   // Create a Tutorial
  const user = {
          userName: req.body.userName,
          userEmail: req.body.userEmail,
          userSocial: req.body.userSocial,
          userRepo: req.body.userRepo,
          userBio: req.body.userBio,
          userAvatarHash: req.body.userAvatarHash,
          userAddress: req.body.userAddress,
          connections:[],
          rooms:[],
          groups:[]
  };

  // Save Tutorial in the database
 //console.log(user)
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    //const userName = req.query.userName;
    //var condition = userName ? { userName: { [Op.like]: `%${userName}%` } } : null;
  //console.log(res)
    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// Find a single User with an id
exports.findByName = (req, res) => {

    const userName = req.params.name;
    var condition = userName ? { userName: { [Op.like]: `%${userName}%` } } : null;
    User.findAll({where:condition})
      .then(data => {
        
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + userName
        });
      });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const userAddress = req.params.id;
    console.log(userAddress);
    //console.log(JSON.stringify(req.body))
   
    let upDateUser=req.body;
    // console.log("here",JSON.parse(upDateUser))
    console.log(JSON.stringify(upDateUser))
    User.update(upDateUser, {
      where: { userAddress: userAddress }
    })
      .then(num => {
        
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${userAddress}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message: `Error updating Tutorial with id=${userAddress} `
        });
      });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
      where: { userAddress: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Users
exports.findByAddress = (req, res) => {
    //console.log(req.params)
    //const userAddress = req.query.userName;
    
    const userAddress = req.params.id;
    console.log(userAddress)
    var condition = userAddress ? { userAddress: { [Op.like]: `%${userAddress}%` } } : null;
    User.findAll({where:condition})
      .then(data => {
        // Send this token also in response
        const token = jwt.sign({ id: data[0].userAddress }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
       console.log("useraddr",token)
        res.send({data,token});
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + userAddress
        });
      });
};

exports.findByEmail = (req, res) => {
  //console.log(req.params)
  //const userAddress = req.query.userName;
  
  const userEmail = req.params.id;
  console.log(userEmail)
  var condition = userEmail ? { userEmail: { [Op.like]: `%${userEmail}%` } } : null;
  User.findAll({where:condition})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + userName
      });
    });
};