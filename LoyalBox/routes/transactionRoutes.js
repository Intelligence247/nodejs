const express = require('express');
const router = express.Router();
const { buyItem, redeemReward, getTransactionHistory } = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/buy', authMiddleware, buyItem);
router.post('/redeem', authMiddleware, redeemReward);
router.get('/history', authMiddleware, getTransactionHistory);

module.exports = router;