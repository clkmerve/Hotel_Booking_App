const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema(
    {
        name: {type: String, required:true},
        address: { type: String, required: true },
        img: [{ type: String, required: true }],
        description:{type: String, required: true },
        city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
        // cheapestPrice: {type: Number,required: true},
       rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }] // Otel ile ilişkili odalar

    },
    {timestamps:true}
);

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;