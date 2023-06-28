'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class nhom_sp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    nhom_sp.init({
        Ten_nhom: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'nhom_sp',
    });
    return nhom_sp;
};  