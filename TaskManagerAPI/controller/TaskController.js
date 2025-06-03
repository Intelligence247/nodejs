// const Task = require("../model/Tasks");

// // Register A Task
// const registerTask = async (req, res) => {
//   const { description, taskname, starttime, endtime } = req.body;

//   if (!description || !taskname || !starttime || !endtime) {
//     return res.status(400).json({
//       message: "description , taskname , starttime and endtime are required.",
//     });
//   }

//   try {
//     // const lastTask = await Task.findOne().sort({ id: -1 });
//     // const newId = lastTask ? lastTask.id + 1 : 1;

//     const newTask = new Task({
//       userId: req.userId,
//       taskname,
//       description,
//       starttime,
//       endtime,
//     });

//     await newTask.save();

//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all Task
// const getAllTask = async (req, res) => {
//   try {
//     const Tasks = await Task.find({ id: req.id });
//     res.json(Tasks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update A Task
// const updateTask = async (req, res) => {
//   const { taskname, description, endtime, starttime } = req.body;

//   if (!id) return res.status(400).json({ message: "ID is required." });

//   try {
//     const task = await Task.findOne(
//       { _id: req.params.id, id: req.id },
//       { taskname, description, endtime, starttime },
//       { new: true }
//     );
//     if (!task)
//       return res.status(404).json({ message: `Task ID ${id} not found.` });

//     if (taskname) Task.taskname = taskname;
//     if (description) Task.description = description;
//     if (endtime) Task.endtime = endtime;
//     if (starttime) Task.starttime = starttime;

//     const updatedTask = await task.save();
//     res.json(updatedTask);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get A Single Task
// const getATask = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const task = await Task.findOne({ id: id });
//     if (!task)
//       return res.status(404).json({ message: `task ID ${id} not found.` });

//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete A task
// const deleteTask = async (req, res) => {
//   // const { id } = req.body;

//   // if (!id) return res.status(400).json({ message: "ID is required." });

//   try {
//     const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
//     if (!task) {
//       return res.status(404).json({ message: `Task ID ${userId} not found.` });
//   }
//     // await task.deleteOne();
//     res.json({ message: `Task ID ${userId} deleted.` });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {
//   registerTask,
//   getAllTask,
//   updateTask,
//   getATask,
//   deleteTask,
// };

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
      userId: req.userId, // assuming req.userId is set from decoded JWT
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
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
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
