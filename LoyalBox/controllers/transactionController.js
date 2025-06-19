const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Reward = require('../models/Reward');

const buyItem = async (req, res) => {
  const { itemName, pointsEarned } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    user.points += pointsEarned;
    await user.save();

    const transaction = new Transaction({
      user: userId,
      type: 'purchase',
      points: pointsEarned,
      description: `Bought ${itemName}`,
    });
    await transaction.save();

    res.json({ message: 'Purchase successful', points: user.points });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const redeemReward = async (req, res) => {
  const { rewardId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const reward = await Reward.findById(rewardId);

    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }

    if (user.points < reward.pointsRequired) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    user.points -= reward.pointsRequired;
    await user.save();

    const transaction = new Transaction({
      user: userId,
      type: 'redeem',
      points: -reward.pointsRequired,
      description: `Redeemed ${reward.name}`,
    });
    await transaction.save();

    res.json({ message: 'Reward redeemed', points: user.points });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactionHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { buyItem, redeemReward, getTransactionHistory };