'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class trang_thai extends Model {

        static associate(models) {
        }
    };
    trang_thai.init({
        Ten_trang_thai: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'trang_thai',
    });
    return trang_thai;
};  