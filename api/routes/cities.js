const express = require('express');
const router = express.Router();
const City = require('../models/City');

router.get('/', async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Yeni şehir ekle
router.post('/', async (req, res) => {
    const city = new City({
        name: req.body.name,
        country: req.body.country,        
        img: req.body.img
    });

    try {
        const newCity = await city.save();
        res.status(201).json(newCity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Şehir sil
router.delete("/:cityId", async (req, res) => {
    try {
      const cityId = req.params.cityId;
  
      const deletedCity = await City.findByIdAndDelete(cityId);
  
      if (!deletedCity) {
        return res.status(404).json({ error: "Şehir bulunamadı" });
      }
  
      res.status(200).json(deletedCity);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error." });
    }
  });

//belirli bir şehir getirme
router.get('/:cityId',async(req,res)=>{
try {
     const cityId = req.params.cityId;

     try {
      const city = await City.findById(cityId);

      res.status(200).json(city);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Şehir bulunamadı" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
   
});

// Şehir güncelle
router.put('/:cityId', async (req, res) => {
    try {
        const cityId = req.params.cityId;
        const { name,country, img } = req.body;

        const updatedCity = await City.findByIdAndUpdate(
            cityId,
            { name,country, img },
            { new: true, runValidators: true }
        );

        if (!updatedCity) {
            return res.status(404).json({ error: "Şehir bulunamadı" });
        }

        res.status(200).json(updatedCity);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;