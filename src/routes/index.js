const express = require('express');
const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const userController = require('../controllers/userController');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.post('/enable', userController.enableUser);
router.post('/disable', userController.disableUser);

module.exports = router;
