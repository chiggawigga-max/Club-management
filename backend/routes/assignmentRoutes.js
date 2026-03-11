const express = require('express');
const {
  createAssignment,
  deleteAssignment,
  getAssignments,
} = require('../controllers/assignmentController');
const { authorizeRoles, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(protect, getAssignments)
  .post(protect, authorizeRoles('admin'), createAssignment);
router.delete('/:id', protect, authorizeRoles('admin'), deleteAssignment);

module.exports = router;