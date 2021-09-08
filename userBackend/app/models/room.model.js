module.exports = (sequelize, Sequelize) => {

const Room = sequelize.define("Room",{
    roomId: {
        type: Sequelize.INTEGER,
        // To increment user_id automatically.
        autoIncrement:true,
  
        // user_id can no  t be null.
        allowNull:false,
  
        // For uniquely identify user.
        primaryKey:true
      },  
  p1: {
    type: Sequelize.STRING,
    //foreignKey: true,
    // references:{
    //     model:'Users',
    //     key: 'userId',
    // },
  },
  p2: {
    type: Sequelize.STRING,
   // foreignKey: true,
    // references:{
    //     model:'Users',
    //     key: 'userId',
    // },
  },
});
// Room.associate = models => {
//   Room.hasMany(models.Users, {
//     foreignKey: 'usersId',
//     sourceKey: 'userId',
//     onDelete: 'cascade',
//     as:'p1'
//   });
// };
// Room.associate = models => {
//   Room.hasMany(models.Users, {
//     foreignKey: 'usersId',
//     sourceKey: 'userId',
//     onDelete: 'cascade',
//     as:'p2'
//   });
// };
return Room;
};
