const express = require('express');
const router = express.Router();
const { createReward, getRewards, updateReward, deleteReward } = require('../controllers/rewardController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', getRewards);
router.post('/', authMiddleware, roleMiddleware('admin'), createReward);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateReward);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteReward);

module.exports = router;