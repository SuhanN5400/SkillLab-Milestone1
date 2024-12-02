const { v4: uuidv4 } = require('uuid');

// In-memory storage for habits
let habits = [];

// Add a new habit
const addHabit = (req, res) => {
  const { name, dailyGoal } = req.body;

  if (!name || !dailyGoal) {
    return res.status(400).json({ error: 'Name and dailyGoal are required' });
  }

  const newHabit = {
    id: uuidv4(),
    name,
    dailyGoal,
    logs: [],
  };

  habits.push(newHabit);
  res.status(201).json(newHabit);
};

// Mark habit as complete for the day
const markHabitComplete = (req, res) => {
  const { id } = req.params;
  const habit = habits.find(h => h.id === id);

  if (!habit) {
    return res.status(404).json({ error: 'Habit not found' });
  }

  habit.logs.push({
    date: new Date().toISOString(),
    completed: true,
  });

  res.status(200).json(habit);
};

// Get all habits
const getAllHabits = (req, res) => {
  res.status(200).json(habits);
};

// Generate weekly report (last 7 days' logs)
const getWeeklyReport = (req, res) => {
  const report = habits.map(habit => {
    const last7DaysLogs = habit.logs.filter(log => {
      const logDate = new Date(log.date);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return logDate >= sevenDaysAgo;
    });

    return {
      name: habit.name,
      last7DaysLogs,
    };
  });

  res.status(200).json(report);
};

module.exports = {
  addHabit,
  markHabitComplete,
  getAllHabits,
  getWeeklyReport,
};
