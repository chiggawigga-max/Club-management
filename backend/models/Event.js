const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    date: { type: Date, required: true },
    location: { type: String, trim: true },
    maxParticipants: { type: Number, min: 1 },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);