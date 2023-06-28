'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class phien_ban extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    phien_ban.init({
        Id_SP: DataTypes.INTEGER,
        Anh_phien_ban: DataTypes.TEXT('long'),
        Ten_phien_ban: DataTypes.STRING,
        Gia_phien_ban: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'phien_ban',
    });
    return phien_ban;
};  