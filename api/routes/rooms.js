const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

// Oda ekleme
router.post("/", async (req, res) => {
    try {
        const roomData = req.body;
        const newRoom = new Room(roomData);
        await newRoom.save();
        await Hotel.findByIdAndUpdate(roomData.hotel, {
            $push: { rooms: newRoom._id }
        });

        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ message: "Oda eklenirken hata oluştu", error });
    }
});
router.put("/:roomId", async (req, res) => {
    const roomId = req.params.roomId;
    //description,

    const { roomName, type, price, description, img, isAvailable,hotel } = req.body;

    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            //description,bu alanı sildim

            {  roomName, type, price, description,isAvailable,hotel ,img },
            { new: true, runValidators: true }
        );

        if (!updatedRoom) {
            return res.status(404).json({ error: "Oda bulunamadı" });
        }

        res.status(200).json(updatedRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
    }
});

// Tüm odaları getirme
router.get("/", async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error getting rooms", error });
    }
});

router.get("/:roomId", async (req, res) => {
    const roomId = req.params.roomId;

    try {
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: "Oda bulunamadı" });
        }
        res.status(200).json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Sunucu hatası." });
    }
});



// Oda silme
router.delete("/:roomId", async (req, res) => {
    const roomId = req.params.roomId;

    try {
        const deletedRoom = await Room.findByIdAndDelete(roomId);

        if (!deletedRoom) {
            return res.status(404).json({ error: "Oda bulunamadı" });
        }

        res.status(200).json({ message: "Oda başarıyla silindi", deletedRoom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
    }
});
//Bir otele ait odaları getirme
//yanlışlık var hotelle çöz
// router.get("/:hotelId/rooms", async (req, res) => {
//     const hotelId = req.params.hotelId;

//     try {
//         const hotel = await Hotel.findById(hotelId).populate("rooms");

//         if (!hotel) {
//             return res.status(404).json({ error: "Otel bulunamadı" });
//         }

//         res.status(200).json(hotel.rooms);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Sunucu hatası." });
//     }
// });


module.exports = router;
