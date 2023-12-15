import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";

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
