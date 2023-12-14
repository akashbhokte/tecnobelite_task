import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTaskStatus } from "../../redux/actions";
import "./TaskList.css";
import { Link, useNavigate } from "react-router-dom";

const TaskList = () => {
  const tasks = useSelector((state) => state.reducer.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getTaskList();
  }, [tasks]);

  const getTaskList = () => {
    const list = JSON.parse(localStorage.getItem("tasks"));
    setTaskList(list);
  };

  const removeTaskFromLocalStorage = (taskIdToRemove) => {
    // Retrieve tasks array from localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Find the index of the task with taskIdToRemove
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
          {taskList.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.status}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(deleteTask(task.id));
                    removeTaskFromLocalStorage(task.id);
                  }}
                >
                  Delete
                </button>
                <button
                // onClick={() => {
                //   navigate("/add", { type: "edit" });
                // }}
                >
                  <Link to={{ pathname: "/add", state: { user: "user" } }}>
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
        Add Task
      </button>
    </div>
  );
};

export default TaskList;
