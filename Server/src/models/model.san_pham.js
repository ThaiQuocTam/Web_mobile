'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class san_pham extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    san_pham.init({
        Ten_san_pham: DataTypes.STRING,
        Hinh_anh: DataTypes.TEXT('long'),
        Gia_san_pham: DataTypes.INTEGER,
        So_luong_SP: DataTypes.INTEGER,
        Thong_tin_bao_hanh: DataTypes.TEXT,
        Ghi_chu: DataTypes.TEXT,
        Id_loai_SP: DataTypes.INTEGER,
        Id_nhom_SP: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'san_pham',
    });
    return san_pham;
};  