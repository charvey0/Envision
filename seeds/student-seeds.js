const { Student } = require('../models');

const studentData = [
    {
        first_name: '',
        last_name: '',
        grade_level: '',
        user_id: 1,
    }
];

const seedStudents = () => Student.bulkCreate(studentData);

module.exports = seedStudents;