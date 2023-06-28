'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class slide extends Model {
        static associate(models) {
        }
    };
    slide.init({
        Hinh_anh: DataTypes.TEXT('long')
    }, {
        sequelize,
        modelName: 'slide',
    });
    return slide;
};  