const sequelize = require('../config/connection');
const { Role, User, Artwork, } = require('../models');

const roleData = require('./roleData.json')
const userData = require('./userData.json');
const artworkData = require('./artworkData.json');
// const studentData = require('./studentData.json');
// const imgaeData = require('./imageData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n-----DATABASE SYNCED-----\n');

    await Role.bulkCreate(roleData);
    console.log('\n----- DATABASE SYNCED-----\n');

    await User.bulkCreate(userData);
    console.log('\n----- DATABASE SYNCED-----\n');

    await Artwork.bulkCreate(artworkData);
    console.log('\n----- DATABASE SYNCED-----\n');

    // await Student.bulkCreate(studentData);
    // console.log('\n----- DATABASE SYNCED-----\n');

    // await Image.bulkCreate(imageData);
    // console.log('\n----- DATABASE SYNCED-----\n');

    process.exit(0);
};

seedAll();