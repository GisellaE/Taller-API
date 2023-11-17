const { validatorHandler } = require("../middlewares/validator.handler"); 
const {
  getComputerSchema,
  createComputerSchema,
  updateComputerSchema,
} = require("../schemas/events.schemas.js"); 
const express = require('express')
const router = express.Router()
const {v4: uuidv4} = require('uuid');

 //Modulos internas
 const { readFile, writeFile } = require('../files');
 const {models} = require('../libs/sequelize');
 const FILE_NAME = './db/computers.txt';

//Rutas de la API
//API
//Listar 
router.get('/', async (req,res) =>{

        const computer  = await models.computer.findAll(); 

        res.send(computer);
    })

 

//Crear Computador

router.post('/', validatorHandler(createComputerSchema, "body"), async (req, res) => {
    //try{
    //leer archivo de computadores
//   const data = readFile(FILE_NAME);

//      //agregar nuevo computador
//   const newComputer = req.body;
//   newComputer.id = uuidv4();
//   console.log (newComputer)
//   data.push(newComputer);//agregar nuevo elemento
//     //Escribir en el archivo
//     writeFile(FILE_NAME, data);
//     res.json({message: 'El computador fue creado'});
//     }catch (error){
//         console.error(error);
//         res.json({message: ' Error al almacenar'});
//     }
const computer = await models.computer.create(req.body); 

res.status(201).send(computer);
});

  

//Obtener un solo computador (usamos los dos puntos por que es un path param)
router.get('/:id', validatorHandler(getComputerSchema,"params" ), async(req, res) =>{
    // console.log(req.params.id);
    // //GUARDAR ID
    // const id = req.params.id
    // //leer contenido del archivo
    // const computers = readFile(FILE_NAME)

    // //Buscar el computador con el ID que recibimos por la url
    // const computersFound = computers.find(computer => computer.id === id)
    // if(!computersFound){
    //     res.status(404).json({'ok': false, message: "computer not found"})
    //     return;
    // }

    // res.send({'ok': true, computer: computersFound});
    const { id } = req.params;
    const computer = await models.computer.findOne({
        where: { id: id },
    });

    res.send(computer);
})


//ACTUALIZAR UN DATO
   
router.put('/:id',  validatorHandler(updateComputerSchema,"body" ), async(req, res) =>{
//     console.log(req.params.id);
//     //GUARDAR ID
//     const id = req.params.id
//     //leer contenido del archivo
//     const computers = readFile(FILE_NAME)
// //Buscar el computador con el ID que recibimos por la url
//     const computerIndex = computers.findIndex(computer => computer.id === id)
//     if(computerIndex <0){ 
  
//         res.status(404).json({'ok': false, message: "computer not found"})
//         return;
    
//     }
//     let computer = computers[computerIndex]; // Sacar del arrelgo
//     computer = {...computer, ...req.body }
//     computers[computerIndex] = computer //poner el computador en el mismo lugar 
//     writeFile(FILE_NAME, computers);


//     res.send({'ok': true, computer: computer});
const { id } = req.params;
    const data = req.body;
    await models.computer.update(req.body, {
        where: { id: id },
    });

    res.send({'ok': true, computer: data});
})

//Delete, eliminar un dato
router.delete('/:id',validatorHandler(getComputerSchema, "params"), async (req, res) =>{
    // console.log(req.params.id);
    // //GUARDAR ID
    // const id = req.params.id
    // //leer contenido del archivo
    // const computers = readFile(FILE_NAME)

    // //Buscar el computador con el ID que recibimos por la url
    // const computerIndex = computers.findIndex(computer => computer.id === id)
    // if(computerIndex <0 ){ //si no se encuentra el computador con ese id
    //     res.status(404).json({'ok': false, message: "computer not found"})
    //     return;
    // }

    
    // //eliminar el computador que este en posicion computerIndex
    // computers.splice (computerIndex, 1)
    // writeFile (FILE_NAME, computers)
   
    

    const { id } = req.params;
    await models.computer.destroy({
      where: { id: id },
    });
    res.send({ ok: true, message: "computer deleted" });

})


module.exports = router;
