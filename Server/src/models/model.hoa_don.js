'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class hoa_don extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    hoa_don.init({
        Ho_ten: DataTypes.STRING,
        So_dien_thoai: DataTypes.STRING,
        Email: DataTypes.STRING,
        Dia_chi_nhan_hang: DataTypes.STRING,
        Ghi_chu: DataTypes.STRING,
        Tong_tien: DataTypes.INTEGER,
        Trang_thai: DataTypes.INTEGER,
        Id_nguoi_dung: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'hoa_don',
    });
    return hoa_don;
};      