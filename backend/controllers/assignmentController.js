const Assignment = require('../models/Assignment');

const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    return res.status(201).json(assignment);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getAssignments = async (_req, res) => {
  const assignments = await Assignment.find()
    .populate('memberId', 'name email skills')
    .populate('eventId', 'title date location')
    .sort({ createdAt: -1 });
  return res.json(assignments);
};

const deleteAssignment = async (req, res) => {
  const assignment = await Assignment.findByIdAndDelete(req.params.id);
  if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
  return res.json({ message: 'Assignment deleted' });
};

module.exports = { createAssignment, getAssignments, deleteAssignment };