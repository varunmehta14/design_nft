

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
      connections: {
       
        type: Sequelize.STRING,
      //  foreignKey: true,
        // references:{
        //     model:'Users',
        //     key:'userId'
        // },
        get() {
          //if(connections.length!=0){
          return JSON.parse(this.getDataValue('connections'))
         // }
      },
      set(val) {
        //if(connections.length!=0){
          this.setDataValue('connections',JSON.stringify(val));
        //}
      },
      },
      rooms: {
        type: Sequelize.STRING,
        //foreignKey: true,
        // references:{
        //   model:'Rooms',
        //   key:'roomId'
        // },
        get() {
          //if(rooms.length!=0){
          return JSON.parse(this.getDataValue('rooms'))
          //}
      },
      set(val) {
        //if(rooms.length!=0){
         this.setDataValue('rooms',JSON.stringify(val));
        //}
      },
      },
      groups: {
        type: Sequelize.STRING,
        //foreignKey: true,
        // references:{
        //     model:'Groups',
        //     key:'groupId'
        // },
        get() {
          //if(groups.length!=0){
          return JSON.parse(this.getDataValue('groups'))
        //}
      },
      set(val) {
        //if(groups.length!=0){
          this.setDataValue('groups',JSON.stringify(val));
        //}
      },
      },
     
    });
    // User.associate = models => {
    //   User.hasMany(models.Users, {
    //     foreignKey: 'usersId',
    //     sourceKey: 'userId',
    //     onDelete: 'cascade',
    //     as:'connections'
    //   });
    // };
    // User.associate = models => {
    //   User.hasMany(models.Rooms, {
    //     foreignKey: 'roomsId',
    //     sourceKey: 'roomId',
    //     onDelete: 'cascade',
    //     as:'rooms'
    //   });
    // };
    // User.associate = models => {
    //   User.hasMany(models.Groups, {
    //     foreignKey: 'groupsId',
    //     sourceKey: 'groupId',
    //     onDelete: 'cascade',
    //     as:'groups'
    //   });
    // };
    return User;
  };