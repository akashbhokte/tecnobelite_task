import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../../redux/actions";
import "./TaskForm.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Task } from "../../types/Task";

const TaskForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  useEffect(() => {
    location.state?.task && setDeafult();
  }, []);

  const setDeafult = () => {
    console.log("call");
    const { id, title, description, dueDate, status } = location.state?.task;
    setTask({ id, title, description, dueDate, status });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title && task.description && task.dueDate) {
      setTask({
        id: "",
        title: "",
        description: "",
        dueDate: "",
        status: "pending",
      });

      const updatedTask = { ...task, id: Date.now() };
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = [...storedTasks, updatedTask];

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      dispatch(addTask({ ...task, id: Date.now() }));
      navigate(-1);
    } else {
      alert("Title, Description, and Due Date are required fields.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const updateTask = (e) => {
    e.preventDefault();
    const taskIdToUpdate = location.state.task.id;
    if (task.title && task.description && task.dueDate) {
      const updatedTask = {
        id: taskIdToUpdate,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
      };
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = storedTasks.map((storedTask) =>
        storedTask.id === taskIdToUpdate ? updatedTask : storedTask
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      dispatch(editTask(taskIdToUpdate, updatedTask));
      navigate(-1);
    } else {
      alert("Title, Description, and Due Date are required fields.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="form-container">
      <h2>{location?.state?.task ? "Update Task" : "Add New Task"}</h2>
      <form onSubmit={location?.state?.task ? updateTask : handleSubmit}>
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
            min={today}
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
        {location.state?.task ? (
          <button type="submit">Update Task</button>
        ) : (
          <button type="submit">Add Task</button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
