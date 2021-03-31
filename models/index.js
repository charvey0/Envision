// QUESTION line 17 -unique: false, ?

const Artwork = require('./Artwork');
const User = require('./User');
const Student = require('./Student');
const Image = require('./Image');
const StudentArt = require('./StudentArt')

User.hasOne(Student, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Artwork.hasOne(Student, {
    foreignKey: 'student_id',
    onDelete: 'CASCADE',
});

Student.hasMany(Artwork, {
    foreignKey: 'student_id',
    onDelete: 'CASCADE',
});
// Student.belongsToMany(Artwork, {
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
    Student,
    Image,
    // StudentArt,
}
