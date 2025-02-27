module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const { authRequired } = require('../middleware/auth');
    
    var router = require("express").Router();
  
    // Create a new user
    router.post("/", users.create);
  
    // Retrieve a single user with id
    router.get("/address/:id", users.findByAddress);

    router.get("/email/:id", users.findByEmail);
    // Retrieve all users
    router.get("/", users.findAll);
  
    // // Retrieve all published users
    // router.get("/published", users.findAllPublished);
  
    // Retrieve a single user with id
    router.get("/name/:name", users.findByName);

    router.get("/routesRequired",authRequired(),  users.checkRegistered);

  
    // Update a user with id
    router.put("/address/:id",authRequired(),  users.update);
  
    // Delete a user with id
    router.delete("/address/:id" , users.delete);
  
    // Delete all users
    //router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };