import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  resetTasks,
  toggleTaskStatus,
} from "../../redux/actions";
import "./TaskList.css";
import { Link, useNavigate } from "react-router-dom";

const TaskList = () => {
  const tasks = useSelector((state) => state.reducer.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    dispatch(resetTasks());
    getTaskList();
  }, []);

  const getTaskList = () => {
    const list = JSON.parse(localStorage.getItem("tasks"));
    // dispatch(addTask(list));

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("storedTasks", storedTasks, typeof storedTasks);

    storedTasks.map((task) => dispatch(addTask(task)));

    setTaskList(tasks);
    // localStorage.removeItem("tasks");
  };

  const removeTaskFromLocalStorage = (taskIdToRemove) => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const indexToRemove = storedTasks.findIndex(
      (task) => task.id === taskIdToRemove
    );

    if (indexToRemove !== -1) {
      // Remove the task from the array
      storedTasks.splice(indexToRemove, 1);

      // Update the tasks array in localStorage
      localStorage.setItem("tasks", JSON.stringify(storedTasks));

      console.log(`Task with ID ${taskIdToRemove} removed from local storage.`);
    } else {
      console.log(`Task with ID ${taskIdToRemove} not found in local storage.`);
    }
  };

  console.log("tasks", tasks);

  return (
    <div>
      <h2>Task List</h2>

      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.status}</td>
              <td>
                <button
                  onClick={() => {
                    removeTaskFromLocalStorage(task.id);
                    dispatch(deleteTask(task.id));
                  }}
                >
                  Delete
                </button>
                <button>
                  <Link to={{ pathname: "/add" }} state={task}>
                    Edit
                  </Link>
                </button>
                <button onClick={() => dispatch(toggleTaskStatus(task.id))}>
                  {task.status === "pending"
                    ? "Mark Completed"
                    : "Mark Pending"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-button" type="submit">
        <Link to={{ pathname: "/add" }}>Add Task</Link>
      </button>
    </div>
  );
};

export default TaskList;
