const Reward = require('../models/Reward');

const createReward = async (req, res) => {
  const { name, description, pointsRequired } = req.body;

  try {
    const reward = new Reward({ name, description, pointsRequired });
    await reward.save();
    res.status(201).json(reward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReward = async (req, res) => {
  const { id } = req.params;
  const { name, description, pointsRequired } = req.body;

  try {
    const reward = await Reward.findByIdAndUpdate(
      id,
      { name, description, pointsRequired },
      { new: true }
    );
    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }
    res.json(reward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReward = async (req, res) => {
  const { id } = req.params;

  try {
    const reward = await Reward.findByIdAndDelete(id);
    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }
    res.json({ message: 'Reward deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReward, getRewards, updateReward, deleteReward };