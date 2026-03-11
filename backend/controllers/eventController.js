const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    return res.status(201).json(event);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getEvents = async (_req, res) => {
  const events = await Event.find().populate('participants', 'name email');
  return res.json(events);
};

const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate('participants', 'name email');
  if (!event) return res.status(404).json({ message: 'Event not found' });
  return res.json(event);
};

const updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) return res.status(404).json({ message: 'Event not found' });
  return res.json(event);
};

const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  return res.json({ message: 'Event deleted' });
};

const registerForEvent = async (req, res) => {
  const { eventId, memberId } = req.body;
  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  const alreadyRegistered = event.participants.some(
    (participant) => participant.toString() === memberId
  );

  if (alreadyRegistered) {
    return res.status(409).json({ message: 'Member already registered for this event' });
  }

  if (event.maxParticipants && event.participants.length >= event.maxParticipants) {
    return res.status(400).json({ message: 'Event has reached max participants' });
  }

  event.participants.push(memberId);
  await event.save();

  return res.json({ message: 'Registration successful', event });
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
};