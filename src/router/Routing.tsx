import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "../components/TaskList/TaskList";
import TaskForm from "../components/TaskForm/TaskForm";

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<TaskForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
