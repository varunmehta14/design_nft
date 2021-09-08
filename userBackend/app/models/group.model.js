module.exports = (sequelize, Sequelize) => {

const Group = sequelize.define("Group",{
    groupId: {
        type: Sequelize.INTEGER,
        // To increment user_id automatically.
        autoIncrement:true,
  
        // user_id can no  t be null.
        allowNull:false,
  
        // For uniquely identify user.
        primaryKey:true
      },  
  name: {
    type:Sequelize.STRING,
    default: '',
  },
  pic: {
    type: Sequelize.STRING,
    default: '',
  },
  members: {
    type: Sequelize.STRING,
    
    // foreignKey: true,
    // references:{
    //     model:'Users',
    //     key: 'userId',
    // },
    get() {
      //if(members.length!=0){
        JSON.parse(this.getDataValue('members'))
      //}
    },
    set(val) {
      //if(member.length!=0){
       this.setDataValue('members',JSON.stringify(val));
      //}
    },
  },
});
// Group.associate = models => {
//   Group.hasMany(models.Users, {
//     foreignKey: 'usersId',
//     sourceKey: 'userId',
//     onDelete: 'cascade',
//     as:'members'
//   });
// };
return Group;
}
