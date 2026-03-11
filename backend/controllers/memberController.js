const Member = require('../models/Member');

const createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    return res.status(201).json(member);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getMembers = async (_req, res) => {
  const members = await Member.find().sort({ createdAt: -1 });
  return res.json(members);
};

const getMemberById = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).json({ message: 'Member not found' });
  return res.json(member);
};

const updateMember = async (req, res) => {
  const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!member) return res.status(404).json({ message: 'Member not found' });
  return res.json(member);
};

const deleteMember = async (req, res) => {
  const member = await Member.findByIdAndDelete(req.params.id);
  if (!member) return res.status(404).json({ message: 'Member not found' });
  return res.json({ message: 'Member deleted' });
};

module.exports = {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
};