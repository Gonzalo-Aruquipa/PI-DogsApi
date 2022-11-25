const { Router } = require('express');
const axios = require('axios');
const {Dog, Temperament} = require('../db.js');
// const Temperament = require('../models/Temperament.js');
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// petition API
const getData = async() => {
    
    const response = await axios("https://api.thedogapi.com/v1/breeds");
    
    const data = await response.data.map(p => {
    let temps = [];
    if (p.temperament) {
        temps = p.temperament.split(", ");
    }
    // temps = p.temperament
    
    let heightArray = [];
    if (p.height.metric) {
        heightArray = p.height.metric.split(" - ");
    }

    let weightArray = [];
    if (p.weight.metric) {
        weightArray = p.weight.metric.split(" - ");
        if(weightArray[0] === "NaN") weightArray[0]=0;
    }
        return {
            id: p.id,
            name: p.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temps,
            life_span: p.life_span,
            image: p.image.url,
        }
    })
return data;
}
// petition bd
const getBd = async () =>{
    const dogsAll = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], 
            through: {
                attributes: [],
            },
        }
    });

    const data = dogsAll.map(dog => {
        let temps = dog.temperaments.map(p => p.name);
            return {
                id: dog.id,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                temperaments: temps,
                life_span: dog.life_span,
                image: dog.image,
            }
        }
        )
        return data
}
//dogs all
router.get("/", async (req, res) => {
    const {name}= req.query;
    //dogs desde api
    const response = await getData();
    //db
    const dogsAll = await getBd();
    
    //uniendo datos
    const dbApi = [...dogsAll, ...response];

        try{
            if(name){
                const filterDogs = dbApi.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
                
                if(filterDogs.length){
                    res.status(200).send(filterDogs)
                }else{
                    res.status(400).send("No se encontraron resultados...")
                }
            }else{
                const dogMain = dbApi.map(dog => {return {id:dog.id, name: dog.name, temperaments: dog.temperaments, weight: dog.weight, image: dog.image}});
                res.send(dogMain)
        }}catch(error){
            res.status(400).send("No se encontraron resultados...")

        }
    
});
//dogs from API
router.get('/api', async(req, res) => {

    const response = await getData();
    const dogMain = response.map(dog => {return {id:dog.id, name: dog.name, temperaments: dog.temperaments, weight: dog.weight, image: dog.image}});
    res.send(dogMain)
})

//dogs from db
router.get('/created', async(req, res) => {
    const data = await getBd();
    res.status(200).send(data)
})
//dogs by id
router.get("/:idRaza", async(req, res) =>{
    const {idRaza} = req.params;

    try {
        //dogs desde bd
        const dogsAll = await getBd();
        //dogs desde api
        const response = await getData();
        //uniendo datos
         const dbApi = [...dogsAll, ...response];
         const raza = dbApi.filter(e => e.id == (idRaza))

        if(raza.length){
            res.status(200).json(raza)
        }else{
            res.status(400).send("No existe el registro de esa raza")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/", async(req, res) => {
    let {name, min_height, max_height, min_weight, max_weight, life_span, temperaments, image} = req.body

    try {
        const heightArray=[];
        heightArray.push(min_height, max_height);

        const weightArray=[];
        weightArray.push(min_weight, max_weight);
        
         const newDog = await Dog.create({name, height: heightArray, weight: weightArray, life_span, image: image ? image : "https://img.freepik.com/vector-premium/huella-vector-pata-perro_71328-325.jpg?w=2000"});

         let dogTemp = await Temperament.findAll({
            where: { name: temperaments},
        })

        newDog.addTemperament(dogTemp);
        res.status(201).send(newDog);

    } catch (error) {
        res.status(404).send("Error en alguno de los datos provistos");
    }
})


module.exports = router;
