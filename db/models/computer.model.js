const {Model, DataTypes} = require('sequelize');

const COMPUTERS_TABLE = 'computers';

const computerSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Marca:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ram:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    almacenamiento:{
        type: DataTypes.STRING,
        allowNull: false
    },
    año:{
        type: DataTypes.DATE,
        allowNull: false
    },
    sn:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpu:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Model:{
        type: DataTypes.STRING,
        allowNull: false
    },
    precio:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
};

class computerModel extends Model{
    static associate(models){
        // this.belongsTo(models.UserModel, {foreignKey: 'user:id', as: 'User'});
    }

    static config(sequelize){ //envia la conexion a la base de datos
        return {
            sequelize,
            tableName: COMPUTERS_TABLE,
            modelName: 'computer',
            timestamps: false
        }
    }
}

module.exports = {COMPUTERS_TABLE, computerSchema, computerModel};