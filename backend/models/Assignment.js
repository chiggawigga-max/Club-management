const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    task: { type: String, required: true, trim: true },
    timeSlot: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assignment', assignmentSchema);