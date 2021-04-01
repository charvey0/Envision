const sequelize = require('../config/connection');

const seedUser = require('./user-seeds');
const seedStudent = require('./student-seeds');
const seedArtwork = require('./artwork-seeds');
const seedImage = require('./image-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n-----DATABASE SYNCED-----\n');

    await seedUser();
    console.log('\n----- DATABASE SYNCED-----\n');

    await seedStudent();
    console.log('\n----- DATABASE SYNCED-----\n');

    await seedArtwork();
    console.log('\n----- DATABASE SYNCED-----\n');

    await seedImage();
    console.log('\n----- DATABASE SYNCED-----\n');

    process.exit(0);
};

seedAll();