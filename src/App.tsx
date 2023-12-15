import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";
import Routing from "./router/Routing";

function App() {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
}

export default App;
