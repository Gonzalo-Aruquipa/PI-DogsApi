const {DataTypes, Sequelize} = require('sequelize');


module.exports = (sequelize) => {

    sequelize.define('temperament', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey : true,
          },
        nombre: {
            type: DataTypes.STRING,
        }  
    },{timestamps:  false});
};