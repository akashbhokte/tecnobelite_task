type state = {
  tasks: [
    {
      id: string;
      title: string;
      description: string;
      dueDate: string;
      status: string;
    }
  ];
};

const initialState: state = {
  tasks: [
    {
      id: "",
      title: "",
      description: "",
      dueDate: "",
      status: "",
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, ...action.payload.updates }
            : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "TOGGLE_TASK_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                status: task.status === "pending" ? "completed" : "pending",
              }
            : task
        ),
      };
    default:
      return state;
  }
};

export default reducer;
