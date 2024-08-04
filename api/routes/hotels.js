const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

// router.post("/", async (req, res) => {
//   try {
//     //cheapestPrice,,rooms,rooms

//     const { name, address, img, city, description } = req.body;
//     const imgArray = img.split(",").map(link => link.trim());
//     const newHotel = new Hotel({ name, address, img:imgArray, city, description });

//     await newHotel.save();

//     res.status(201).json(newHotel);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { name, address, img, city, description } = req.body;
    const imgArray = img.split(",").map(link => link.trim());
    const newHotel = new Hotel({ name, address, img: imgArray, city, description });

    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error getting hotels", error });
  }
});

// Belirli bir otelin detaylarını getirme
router.get("/:hotelId", async (req, res) => {
  const hotelId = req.params.hotelId;

  try {
    console.log(`Getting details for hotel with ID: ${hotelId}`);
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ error: "Otel bulunamadı" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Belirli bir şehirdeki otelleri getirme
router.get("/city/:cityId", async (req, res) => {
  const cityId = req.params.cityId;
  try {
    const hotels = await Hotel.find({ city: cityId }).populate("city", "name");
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error getting hotels", error });
  }
});

//! Belirli bir otelin odalarını getirme
// router.get("/:hotelId/rooms", async (req, res) => {
//     const hotelId = req.params.hotelId;

//     try {
//         const hotel = await Hotel.findById(hotelId).populate('city', 'name').populate("rooms");
//         console.log(hotel);
//         if (!hotel) {
//             return res.status(404).json({ error: "Otel bulunamadı" });
//         }

//         res.status(200).json(hotel.rooms);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Server error." });
//     }
// });

router.get("/:hotelId/rooms", async (req, res) => {
  const hotelId = req.params.hotelId;

  try {
    const hotel = await Hotel.findById(hotelId).populate("rooms");
    if (!hotel) {
      return res.status(404).json({ error: "Otel bulunamadı" });
    }

    res.status(200).json({ hotel, rooms: hotel.rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});


router.put("/:hotelId", async (req, res) => {
  const hotelId = req.params.hotelId;
  const { name, address, img, city, description } = req.body;
  const imgArray = img.split(",").map(link => link.trim());

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { name, address, img: imgArray, city, description },
      { new: true, runValidators: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ error: "Otel bulunamadı" });
    }

    res.status(200).json(updatedHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Belirli bir oteli silme
router.delete("/:hotelId", async (req, res) => {
  const hotelId = req.params.hotelId;

  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

    if (!deletedHotel) {
      return res.status(404).json({ error: "Otel bulunamadı" });
    }

    res.status(200).json({ message: "Otel başarıyla silindi", deletedHotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
