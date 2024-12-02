const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

// Define the routes and link them to the controller
router.post('/', habitController.addHabit);
router.put('/:id', habitController.markHabitComplete);
router.get('/', habitController.getAllHabits);
router.get('/report', habitController.getWeeklyReport);

module.exports = router;
