// QUESTION line 17 -unique: false, ?

const Artwork = require('./Artwork');
const User = require('./User');
const Role = require('./Role');
// const Image = require('./Image');

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

// Artwork.hasOne(Image, {
//   foreignKey: 'image_id',
// });

module.exports = {
  Artwork,
  User,
  Role,
  // Image,
};
