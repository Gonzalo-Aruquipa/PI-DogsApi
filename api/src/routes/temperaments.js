const { Router } = require("express");
const axios = require("axios");
const { Temperament } = require("../db.js");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req, res) => {
  const response = await axios("https://api.thedogapi.com/v1/breeds");
  const data = await response.data.map((p) => p.temperament);

  const temps = data.toString().split(",");

  temps.forEach((element) => {
    let tempe = element.trim();
    if (tempe) {
      Temperament.findOrCreate({
        where: { name: tempe },
      });
    }
  });

  const temperamentsAll = await Temperament.findAll();
  res.status(200).send(temperamentsAll);
});

module.exports = router;
