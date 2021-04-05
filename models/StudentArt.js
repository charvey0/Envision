const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const Student = require('./Student');

class StudentArt extends Model { }

StudentArt.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        artwork_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'artwork',
                key: 'id'
            }
        },
        student_id: {
            type: DataTypes.STRING,
            references: {
                model: 'student',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'student_art',
    }
);

module.exports = StudentArt;
