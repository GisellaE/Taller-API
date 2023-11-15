const { validatorHandler } = require("./src/middlewares/validator.handler"); 
const {
  getComputerSchema,
  createComputerSchema,
  updateComputerSchema,
} = require("./src/schemas/events.schemas");


//Librerias externas
const express = require('express');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

//Modulos internos
const { readFile, writeFile } = require('./src/files.js');
const computers_api = require ('./src/routes/computers_api');
const computers =  require ('./src/routes/computers');
const { get } = require("http");

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'My App';
const FILE_NAME = './db/computers.txt';



//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Usar el motor de plantillas de EJS
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Ruta- listar computadores
app.get('/read-file', (req, res) => {
    const data = readFile(FILE_NAME);
    res.send(data);
});


app.use('/api/computers', computers_api);
app.use('/computers', computers);


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});


    




