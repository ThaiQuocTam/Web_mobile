'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    review.init({
        Ten_nguoi_dung: DataTypes.STRING,
        Noi_dung: DataTypes.TEXT,
        Loai: DataTypes.INTEGER,
        Id_nguoi_dung: DataTypes.INTEGER,
        Id_phan_quyen: DataTypes.INTEGER,
        Id_review_user: DataTypes.INTEGER,
        Checked: DataTypes.BOOLEAN,
        Id_san_pham: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'review',
    });
    return review;
};  