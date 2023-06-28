'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class nguoi_dung extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    nguoi_dung.init({
        Ho_ten: DataTypes.STRING,
        Email: DataTypes.STRING,
        Dien_thoai: DataTypes.INTEGER,
        Mat_khau: DataTypes.STRING,
        Gioi_tinh: DataTypes.BOOLEAN,
        Id_phan_quyen: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'nguoi_dung',
    });
    return nguoi_dung;
};  