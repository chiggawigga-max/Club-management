const express = require('express');
const {
  createMember,
  deleteMember,
  getMemberById,
  getMembers,
  updateMember,
} = require('../controllers/memberController');
const { authorizeRoles, protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getMembers).post(protect, authorizeRoles('admin'), createMember);
router
  .route('/:id')
  .get(protect, getMemberById)
  .put(protect, authorizeRoles('admin'), updateMember)
  .delete(protect, authorizeRoles('admin'), deleteMember);

module.exports = router;