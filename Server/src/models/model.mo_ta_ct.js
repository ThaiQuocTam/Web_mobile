'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class mo_ta_ct extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    mo_ta_ct.init({
        Cong_nghe_man_hinh: DataTypes.STRING,
        Do_phan_giai: DataTypes.STRING,
        He_dieu_hanh: DataTypes.STRING,
        Chip_xu_ly: DataTypes.STRING,
        Bo_nho_ROM: DataTypes.STRING,
        RAM: DataTypes.STRING,
        Dung_luong_PIN: DataTypes.STRING,
        Hinh_anh: DataTypes.TEXT('long'),
        Id_san_pham: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'mo_ta_ct',
    });
    return mo_ta_ct;
};  