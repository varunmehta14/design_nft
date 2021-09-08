module.exports = (sequelize, Sequelize) => {

const Chat = sequelize.define("Chat",{
  chatMessage: {
    type: Sequelize.STRING,
  },
  sender: {
    type: Sequelize.INTEGER,
    //foreignKey: true,
    // references:{
    //     model:'Users',
    //     key:'userId'
    // },
    
  },
  senderName: {
    type: Sequelize.STRING,
  },
  senderEmail: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  grpMsg: {
    type: Sequelize.BOOLEAN,
    default: false
  },
  roomId: {
    type: Sequelize.INTEGER,
    
    //foreignKey: true,
    // references:{
    //     model:'Rooms',
    //     key:'roomId'
    // },
  },
  grpId: {
    type: Sequelize.INTEGER,
    
    //foreignKey: true,
    // references:{
    //     model:'Groups',
    //     key:'groupId'
    // },
  },
}, {timestamps: true});
// Chat.associate = models => {
//   Chat.hasMany(models.Users, {
//     foreignKey: 'usersId',
//     sourceKey: 'userId',
//     onDelete: 'cascade',
//     as:'Sender'
//   });
// };
// Chat.associate = models => {
//   Chat.hasMany(models.Rooms, {
//     foreignKey: 'roomsId',
//     sourceKey: 'roomId',
//     onDelete: 'cascade',
//     as:'roomId'
//   });
// };
// Chat.associate = models => {
//   Chat.hasMany(models.Groups, {
//     foreignKey: 'groupsId',
//     sourceKey: 'groupId',
//     onDelete: 'cascade',
//     as:'grpId'
//   });
// };
 return Chat;
}
