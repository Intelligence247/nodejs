const express = require('express');
const router = express.Router();
const { getAllUsers, getUserPointsHistory, promoteToAdmin } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.get('/:userId/points-history', authMiddleware, roleMiddleware('admin'), getUserPointsHistory);
router.put('/:userId/promote', authMiddleware, roleMiddleware('admin'), promoteToAdmin);

module.exports = router;