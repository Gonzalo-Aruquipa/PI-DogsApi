const { Router } = require('express');
const axios = require('axios');
const {Dog, Temperament} = require('../db.js');
// const Temperament = require('../models/Temperament.js');
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// peticiones
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
//dogs all
router.get("/", async (req, res) => {
    const {name}= req.query;
    //dogs desde api
    const response = await getData();

        try{
            if(name){
                //db
                const dogsAll = await Dog.findAll({
                    include: {
                        model: Temperament,
                        attributes: ['name'], 
                        through: {
                            attributes: [],
                        },
                    }
                });
                //
                const dogsData = dogsAll.map(values => values.dataValues);
                //
                //uniendo datos
                const dbApi = [...dogsData, ...response];

                const filterDogs = dbApi.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
                
                if(filterDogs.length){
                    res.status(200).send(filterDogs)
                }else{
                    res.status(400).send("No se encontraron resultados...")
                }
            }else{
                res.send(response)
        }}catch(error){
            res.status(400).send("No se encontraron resultados...")

        }
    
});
//dogs from db
router.get('/created', async(req, res) => {

    const dogsAll = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], 
            through: {
                attributes: [],
            },
        }
    });
    res.status(200).send(dogsAll)
})


router.get("/:idRaza", async(req, res) =>{
    const {idRaza} = req.params;

    try {
        //dogs desde bd
        const dogsAll = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'], 
                through: {
                    attributes: [],
                },
            }
        });
        const dogsData = dogsAll.map(values => values.dataValues);
        //dogs desde api
        const response = await getData();
        //uniendo datos
         const dbApi = [...dogsData, ...response];
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
        
         const newDog = await Dog.create({name, height: heightArray, weight: weightArray, life_span, image: image ? image : "https://img.freepik.com/vector-premium/adorable-perro-sentado-dibujos-animados_74769-13.jpg?w=2000"});

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
