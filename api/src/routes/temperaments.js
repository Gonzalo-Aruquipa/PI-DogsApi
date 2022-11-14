const { Router } = require('express');
const axios = require('axios');
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.get("/", async (req, res) => {
//     const response = await axios("https://api.thedogapi.com/v1/breeds");
//     res.json(response.data)
// })
// router.get("/:id", (req, res) =>{
//     const {id} = req.params;
//     res.json(id);
// })

// router.post("/", (req, res) => {
//     const {id, name} = req.body;

//     res.json({id, name})
// })


module.exports = router;
