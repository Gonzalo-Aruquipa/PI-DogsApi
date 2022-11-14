const { Router } = require('express');
const axios = require('axios');
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

router.get("/", async (req, res) => {
    
    const datos = await getData();
    res.send(datos)
})

router.get('/', async (req, res) => {
    const {name}= req.query;
    try {
        if(name){
        const response = await getData();
        const filterDogs = response.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
        
        res.send(filterDogs)
        }else{
            throw "No se encontraron resultados..."
        }
        
    } catch (error) {
        
    }
})
// router.get("/:id", (req, res) =>{
//     const {id} = req.params;
//     res.json(id);
// })

// router.post("/", (req, res) => {
//     const {id, name} = req.body;

//     res.json({id, name})
// })


module.exports = router;
