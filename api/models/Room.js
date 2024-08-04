const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  type: { type: String, required: true },
  img:{type: String, required: true },
  description:{type: String, required: true },
  price: { type: Number, required: true },
 
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' } // Oda ile ilişkili otel
},
{ timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
