const Task = require("../model/Tasks");

// Register a Task
const registerTask = async (req, res) => {
  const { description, taskname, starttime, endtime } = req.body;

  if (!description || !taskname || !starttime || !endtime) {
    return res.status(400).json({
      message: "description, taskname, starttime, and endtime are required.",
    });
  }

  try {
    const newTask = new Task({
      userId: req.userId,
      taskname,
      description,
      starttime,
      endtime,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all Tasks for a user
const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a Task
const updateTask = async (req, res) => {
  const { taskname, description, starttime, endtime } = req.body;

  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    if (taskname) task.taskname = taskname;
    if (description) task.description = description;
    if (starttime) task.starttime = starttime;
    if (endtime) task.endtime = endtime;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Task
const getATask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json({ message: "Task deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerTask,
  getAllTask,
  updateTask,
  getATask,
  deleteTask,
};
