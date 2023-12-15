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
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Task } from "../../types/Task";
import { FaSortUp, FaSortDown } from "react-icons/fa";

const TaskList = () => {
  const tasks = useSelector((state: any) => state.reducer.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    dispatch(resetTasks());
    getTaskList();
  }, []);

  const getTaskList = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.map((task: Task) => dispatch(addTask(task)));
  };

  const removeTaskFromLocalStorage = (taskIdToRemove: string) => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const indexToRemove = storedTasks.findIndex(
      (task) => task.id === taskIdToRemove
    );

    if (indexToRemove !== -1) {
      storedTasks.splice(indexToRemove, 1);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
      console.log(`Task with ID ${taskIdToRemove} removed from local storage.`);
    } else {
      console.log(`Task with ID ${taskIdToRemove} not found in local storage.`);
    }
  };

  const handleSortChange = (e) => {
    const selectedSortBy = e;

    if (selectedSortBy === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(selectedSortBy);
      setSortOrder("asc");
    }
  };

  const sortedTasks = tasks.slice().sort((a: Task, b: Task) => {
    if (sortBy === "dueDate") {
      const dateA = new Date(a[sortBy]).getTime();
      const dateB = new Date(b[sortBy]).getTime();

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      const valueA = String(a[sortBy]).toLowerCase();
      const valueB = String(b[sortBy]).toLowerCase();

      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
  });

  const getSortIcon = (sortKey) => {
    if (sortBy === sortKey) {
      return sortOrder === "desc" ? <FaSortUp /> : <FaSortDown />;
    }
    return null;
  };

  return (
    <div>
      <h2>Task List</h2>

      <div className="sort-by-container">
        <label>Sort By:</label>
        <div className="sorting-options">
          <div
            onClick={() => handleSortChange("title")}
            className={`sort-option ${sortBy === "title" ? "active" : ""}`}
          >
            Title {getSortIcon("title")}
          </div>
          <div
            onClick={() => handleSortChange("dueDate")}
            className={`sort-option ${sortBy === "dueDate" ? "active" : ""}`}
          >
            Due Date {getSortIcon("dueDate")}
          </div>
          <div
            onClick={() => handleSortChange("status")}
            className={`sort-option ${sortBy === "status" ? "active" : ""}`}
          >
            Status {getSortIcon("status")}
          </div>
        </div>
      </div>

      {/* <table className="custom-table">
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
      </table> */}

      <div style={{ padding: 10 }}>
        {sortedTasks.map((task: Task) => {
          return (
            <div className="card-container" key={task.id}>
              <div className="card-date-container">
                <span className="date-text">{task.dueDate}</span>
              </div>
              <div className="card">
                <div className="header-container">
                  <div className="title-container">
                    <h3>{task.title}</h3>
                  </div>
                  <div className="icons-container">
                    <MdEdit
                      size={18}
                      className="edit-btn"
                      onClick={() => navigate("/add", { state: { task } })}
                    />
                    <MdDelete
                      size={18}
                      className="delete-btn"
                      onClick={() => {
                        removeTaskFromLocalStorage(task.id);
                        dispatch(deleteTask(task.id));
                      }}
                    />
                  </div>
                </div>
                <div className="description-container">
                  <span className="description">{task.description}</span>
                  <span className="task-status">{task.status}</span>
                </div>
                {/* <Link to={{ pathname: "/Form" }}>{li.name}</Link> */}

                {/* <div onClick={() => handleDelete()}>Delete</div> */}
              </div>
            </div>
          );
        })}
      </div>
      <button className="add-button" type="submit">
        <Link to={{ pathname: "/add" }}>Add Task</Link>
      </button>
    </div>
  );
};

export default TaskList;
