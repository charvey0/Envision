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
  onDelete: 'CASCADE',
});

Comment.belongsTo(Artwork, {
  foreignKey: 'artwork_id',
})

Artwork.hasMany(Comment, {
  foreignKey: 'artwork_id',
  onDelete: 'CASCADE',
})

Comment.belongsTo(User, {
  foreignKey: 'user_id',
})

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
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
