onst { validatorHandler } = require("../middlewares/validator.handler"); 
const {
  getComputerSchema,
  createComputerSchema,
  updateComputerSchema,
} = require("../schemas/events.schemas.js"); 
const express = require('express')
const router = express.Router()
const {v4: uuidv4} = require('uuid');
;

const { readFile, writeFile } = require('../files');
const {models} = require('../libs/sequelize');  

 const FILE_NAME = './db/computers.txt';
//WEB
//Rutas

// Listar Mascotas
router.get('/', async (req, res) =>{
    const {search} = req.query;

    let computers = await models.computer.findAll();
    
    if(search){
         computers = computers.filter(computer => computer.Marca.toLowerCase().includes(search.toLowerCase()));
    }
    //const data = readFile(FILE_NAME);

    //consulta con sequelize
    res.render('computers/index', { computers: computers, search: search });
});
    



router.get('/create', (req,res) =>{
    //Mostrar el formulario
    res.render('computers/create');
})

//Crear Computador
router.post('/',validatorHandler(createComputerSchema, "body"), async (req, res) => {
    try{
        //leer archivo de computadores
  //const data = readFile(FILE_NAME);
  //agregar nuevo computador
  //const newComputer = req.body;
  //newComputer.id = uuidv4();
  //console.log (newComputer)
  //data.push(newComputer);//agregar nuevo elemento

  //escribir en el archivo

  //writeFile(FILE_NAME, data);
    //res.json({message: 'El computador fue creado'});
    const newcomputer = await models.computer.create(req.body); 
    res.redirect('/computers');
  }catch (error){
      console.error(error);
      res.json({message: ' Error al almacenar '});
  }

});

//eliminar computador
router.post('/delete/:id', (req, res) => {
    console.log(req.params.id);
    //Guardar el ID
    const id = req.params.id
    //Leer el contenido del archivo
    //const computers = readFile(FILE_NAME)
    // Buscar la mascota con el ID que recibimos
   // const ComputerIndex = computers.findIndex(computer => computer.id === id )
    //if( ComputerIndex < 0 ){// Si no se encuentra la mascota con ese ID
       // res.status(404).json({'ok': false, message:"Pet not found"});
       // return;
   // }
    //Eliminar la mascota que esté en la posición petIndex
    //computers.splice(ComputerIndex, 1);
    //writeFile(FILE_NAME, computers)
    models.computer.destroy({
        where:{
            id: id
        }
    });
    res.redirect('/computers');
})





//Obtener un solo computador (usamos los dos puntos por que es un path param)
router.get('/:id', validatorHandler(getComputerSchema,"params" ), async(req, res) =>{
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
});



   
  

//Actualizar un computador
router.get("/update/:id", async (req, res) => {
    //guardar el ID
    const id = req.params.id;

    //leer el contenido del archivo
    // const computers = readFile(FILE_NAME);
    const computers = await models.computer.findAll();

    //Buscar el computador con el ID que recibimos por la url
    const computerFound = computers.find((computer) => computer.id == id);
  
    if (!computerFound) {
        res.status(404).json({'ok': false, message: "computer not found"})
        return;
    }
  
    res.render("computers/update", { computer: computerFound });
  });


  

  router.post("/update/:id", async (req, res) => {
    //:ID parametro
    console.log(req.params.id);
   //guardar el ID
    const id = req.params.id;
    //leer el contenido del archivo
    // const computers = readFile(FILE_NAME);
    const computers = await models.computer.findAll();
    //buscar el pc con el id que recibimos
    const computerFound = computers.find((computer) => computer.id == id); 
    if (!computerFound) {
      res.status(404).json({ ok: false, message: "computer not found" });
      return;
    }
    //actualizar el pc
    // computerFound.Marca = req.body.Marca;
    // computerFound.ram = req.body.ram;
    // computerFound.almacenamiento = req.body.almacenamiento;
    // computerFound.año = req.body.año;
    // computerFound.sn = req.body.sn;
    // computerFound.cpu = req.body.cpu;
    // computerFound.Model = req.body.Model;
    // computerFound.precio = req.body.precio;

    let currentDate = new Date()
    let date = ("0" + currentDate.getDate()).slice(-2);
    let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let currentTimestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds

    computerFound.update({
        Marca: req.body.Marca,
        ram: req.body.ram, 
        almacenamiento: req.body.almacenamiento,
        año: currentTimestamp,
        sn: req.body.sn,
        cpu: req.body.cpu,
        Model: req.body.Model,
        precio: req.body.precio
    })

    //guardar el archivo
    //writeFile(FILE_NAME, computers);
    //Enviar
    res.render("computers/update", { computer: computerFound });
  });



router.get('/', async (req, res) => {
    const data = readFile(FILE_NAME);
    res.json(data);
})

module.exports = router;
