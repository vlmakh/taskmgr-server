const { Task, joiTaskStatusSchema } = require("../../models/taskSchema");
const { NotFound } = require("http-errors");

const updateTaskStatus = async (req, res, next) => {
  const { taskId } = req.params;
  const { completed } = req.body;

  try {
    const { error } = joiTaskStatusSchema.validate({ completed });

    if (error) {
      error.status = 400;
      error.message = "missing status";
      throw error;
    }

    const data = await Task.findByIdAndUpdate(
      taskId,
      { completed },
      {
        new: true,
      }
    );

    if (!data) {
      throw NotFound(`Task id:${taskId} was not found`);
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = updateTaskStatus;
