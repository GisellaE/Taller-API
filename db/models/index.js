const {computerModel, computerSchema} = require('./computer.model');

function setUpModels (sequelize){
    computerModel.init(computerSchema, computerModel.config(sequelize));

}

module.exports = setUpModels;