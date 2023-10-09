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
const { get } = require("http");

const app = express();
const FILE_NAME = './db/computers.txt';

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Ruta- listar computadores


app.get('/computers', async (req, res) => {
    const data = readFile(FILE_NAME);
    res.json(data);
})

//Crear Computador
app.post('/computers',validatorHandler(createComputerSchema, "body"), async (req, res) => {
    try{
        //leer archivo de computadores
  const data = readFile(FILE_NAME);
  //agregar nuevo computador
  const newComputer = req.body;
  newComputer.id = uuidv4();
  console.log (newComputer)
  data.push(newComputer);//agregar nuevo elemento

  //escribir en el archivo

  writeFile(FILE_NAME, data);
  res.json({message: 'El computador fue creado'});
  }catch (error){
      console.error(error);
      res.json({message: ' Error al almacenar '});
  }

});

//Obtener un solo computador (usamos los dos puntos por que es un path param)
app.get('/computers/:id', validatorHandler(getComputerSchema,"params" ), async(req, res) =>{
    console.log(req.params.id);
    //guardar el ID
    const id = req.params.id
    //leer el contenido del archivo
    const computers = readFile(FILE_NAME)
    //Buscar el computador con el ID que recibimos por la url
    const computersFound = computers.find(computer => computer.id === id)
    if(!computersFound){
        res.status(404).json({'ok': false, message: "computer not found"})
    }

    res.send({'ok': true, computer: computersFound});
})

//Actualizar un computador
app.put('/computers/:id', validatorHandler(updateComputerSchema,"body" ), async(req, res) =>{
    console.log(req.params.id);
    //guardar el ID
    const id = req.params.id
    //leer el contenido del archivo
    const computers = readFile(FILE_NAME)
    //Buscar el computador con el ID que recibimos por la url
    const computerIndex = computers.findIndex(computer => computer.id === id)
    if(computerIndex <0){ // Si no se encuentra la mascota con ese id 

        res.status(404).json({'ok': false, message: "computer not found"})
        return;
    
    }
    let computer = computers[computerIndex]; // Sacar del arrelgo
    computer = {...computer, ...req.body }
    computers[computerIndex] = computer //poner el computador en el mismo lugar 
    writeFile(FILE_NAME, computers);


    //si el computador existe, modificar sus datos y almacenarlo nuevamente

    res.send({'ok': true, computer: computer});
})

//Eliminar un computador
app.delete('/computers/:id',validatorHandler(getComputerSchema, "params"), async (req, res) =>{
    console.log(req.params.id);
    //guardar el ID
    const id = req.params.id
    //leer el contenido del archivo
    const computers = readFile(FILE_NAME)
    //Buscar el computador con el ID que recibimos por la url
    const computerIndex = computers.findIndex(computer => computer.id === id)
    if(computerIndex <0 ){ //si no se encuentra el computador con ese id
        res.status(404).json({'ok': false, message: "computer not found"})
        return;
    }
    //eliminar el computador que este en posicion computerIndex
    computers.splice (computerIndex, 1)
    writeFile (FILE_NAME, computers)


    res.json({'ok': true});
})


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});


    




