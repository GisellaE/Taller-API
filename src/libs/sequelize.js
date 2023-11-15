const {Sequelize} = require ('sequelize');
const setUpModels = require('../../db/models');

const sequelize = new Sequelize('computers','postgres', 'Manizales123',{
host: 'localhost',
dialect: 'postgres',
logging: true
});

setUpModels (sequelize)

module.exports = sequelize;