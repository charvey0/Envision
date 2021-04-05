// QUESTION line 17 -unique: false, ?

const Artwork = require('./Artwork');
const User = require('./User');
const Student = require('./Student');
const Image = require('./Image');
const Role = require('./Role');
// const StudentArt = require('./StudentArt')

Artwork.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Artwork, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.belongsTo(Role, {
  foreignKey: 'role_id',
});

Role.hasMany(User, {
  foreignKey: 'role_id',
});
// user.belongsToMany(Artwork, {
//     through: {
//         model: StudentArt,
//         unique: false,
//     },
//     as: 'artworks'
// });

// Image.hasOne

module.exports = {
  Artwork,
  User,
  Role,
  // Image,
  // StudentArt,
};
