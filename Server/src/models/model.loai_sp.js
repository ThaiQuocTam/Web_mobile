'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class loai_sp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    loai_sp.init({
        Ten_loai_SP: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'loai_sp',
    });
    return loai_sp;
};  