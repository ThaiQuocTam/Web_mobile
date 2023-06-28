'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class chi_tiet_hd extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    chi_tiet_hd.init({
        Ten_san_pham: DataTypes.STRING,
        Gia_san_pham: DataTypes.INTEGER,
        So_luong: DataTypes.INTEGER,
        Id_HD: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'chi_tiet_hd',
    });
    return chi_tiet_hd;
};  