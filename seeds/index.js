const sequelize = require('../config/connection');
const { User, Student, Artwork, Image } = require('../models');

const userData = require('./userData.json');
const roleData = require('./roleData.json')
const studentData = require('./studentData.json');
const artworkData = require('./artworkData.json');
const imgaeData = require('./imageData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n-----DATABASE SYNCED-----\n');

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    console.log('\n----- DATABASE SYNCED-----\n');

    await Student.bulkCreate(studentData);
    console.log('\n----- DATABASE SYNCED-----\n');

    await Artwork.bulkCreate(artworkData);
    console.log('\n----- DATABASE SYNCED-----\n');

    await Image.bulkCreate(imageData);
    console.log('\n----- DATABASE SYNCED-----\n');

    process.exit(0);
};

seedAll();