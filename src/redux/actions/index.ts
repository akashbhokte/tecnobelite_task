// src/redux/actions.js
export const addTask = (task) => ({
  type: "ADD_TASK",
  payload: task,
});

export const editTask = (taskId, updates) => ({
  type: "EDIT_TASK",
  payload: { taskId, updates },
});

export const deleteTask = (taskId) => ({
  type: "DELETE_TASK",
  payload: taskId,
});

export const toggleTaskStatus = (taskId) => ({
  type: "TOGGLE_TASK_STATUS",
  payload: taskId,
});
