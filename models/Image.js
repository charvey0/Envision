const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Image extends Model { }

Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // artwork_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: "artwork",
        //         key: "id",
        //     }
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'image',
    }
);

module.exports = Image;