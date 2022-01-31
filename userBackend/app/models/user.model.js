

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
      userId: {
        type: Sequelize.INTEGER,
        // To increment user_id automatically.
        autoIncrement:true,
  
        // user_id can no  t be null.
        allowNull:false,
  
        // For uniquely identify user.
        primaryKey:true
      },
      userName: {
        type: Sequelize.STRING,
        // user_id can not be null.
        allowNull:false,
  
        // For uniquely identify user.
        primaryKey:true
      },
      userEmail: {
        type: Sequelize.STRING,
        // user_id can not be null.
        allowNull:false,
  
        // For uniquely identify user.
        primaryKey:true
      },
      userSocial: {
        type: Sequelize.STRING
      },
      userRepo: {
        type: Sequelize.STRING
      },
      userBio: {
        type: Sequelize.STRING
      },
      userAvatarHash: {
        type: Sequelize.STRING
      },
      userAddress: {
        type: Sequelize.STRING,
        // user_id can not be null.
        allowNull:false,
  
        // For uniquely identify user.
        primaryKey:true
      },
     
     
    });
    return User;
   
  };