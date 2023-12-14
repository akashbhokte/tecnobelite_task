import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
// import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { Route, Router, Routes } from "react-router-dom";
import Routing from "./router/Routing";

function App() {
  return (
    <Provider store={store}>
      {/* <div>
        <TaskForm />
        <TaskList />
      </div> */}
      <Routing />
    </Provider>
  );
}

export default App;
