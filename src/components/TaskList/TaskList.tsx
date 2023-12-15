import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addTask, deleteTask, resetTasks } from "../../redux/actions";
import "./TaskList.css";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { Task } from "../../types/Task";

import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";

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

  const getSortIcon = (sortKey: string) => {
    if (sortBy === sortKey) {
      return sortOrder === "desc" ? (
        <FaLongArrowAltUp />
      ) : (
        <FaLongArrowAltDown />
      );
    }
    return null;
  };

  return (
    <div className="main-container">
      <div className="list-header">
        <h2>Task List</h2>
        <Link to={{ pathname: "/add" }} className="add-button">
          <IoMdAdd color="white" />
        </Link>
      </div>

      <div className="body-container">
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
        {sortedTasks.map((task: Task) => {
          return (
            <div className="card-container" key={task.id}>
              <div
                className={
                  task.status == "completed"
                    ? "complete-card-date-container"
                    : "card-date-container"
                }
              >
                <span className="date-text">{task.dueDate}</span>
              </div>
              <div
                className={
                  task.status == "completed" ? "complete-card" : "card"
                }
              >
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
                  <span
                    className={
                      task.status == "completed"
                        ? "complete-task-status"
                        : "task-status"
                    }
                  >
                    {task.status}
                  </span>
                </div>
                {/* <Link to={{ pathname: "/Form" }}>{li.name}</Link> */}

                {/* <div onClick={() => handleDelete()}>Delete</div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
