// QUESTION line 17 -unique: false, ?

const Artwork = require('./Artwork');
const User = require('./User');
const Role = require('./Role');
const Comment = require('./Comment');
const { hasHook, hasMany } = require('./Artwork');
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

Comment.belongsTo(Artwork, {
  foreignKey: 'artwork_id',
  onDelete: "cascade"
})

Artwork.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: "cascade"
})

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: "cascade"
})

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: "cascade"
})


// Artwork.hasOne(Image, {
//   foreignKey: 'image_id',
// });

module.exports = {
  Artwork,
  User,
  Role,
  Comment,
  // Image,
};
