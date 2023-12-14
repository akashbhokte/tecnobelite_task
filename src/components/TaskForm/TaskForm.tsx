import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/actions";
import "./TaskForm.css";
import { useLocation } from "react-router-dom";

type task = {
  title: string;
  description: string;
  dueDate: string;
  status: string;
};

const TaskForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("Location", location);
  const [task, setTask] = useState<task>({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title && task.description && task.dueDate) {
      dispatch(addTask({ ...task, id: Date.now() }));
      setTask({ title: "", description: "", dueDate: "", status: "pending" });

      const updatedTask = { ...task, id: Date.now() };
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = [...storedTasks, updatedTask];

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      alert("Title, Description, and Due Date are required fields.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <div className="form-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Status:
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
