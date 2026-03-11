const express = require('express');
const {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  registerForEvent,
  updateEvent,
} = require('../controllers/eventController');
const { authorizeRoles, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getEvents).post(protect, authorizeRoles('admin'), createEvent);
router
  .route('/:id')
  .get(protect, getEventById)
  .put(protect, authorizeRoles('admin'), updateEvent)
  .delete(protect, authorizeRoles('admin'), deleteEvent);
router.post('/register', protect, registerForEvent);

module.exports = router;