import { useContext } from "react";

import Todo from "./Components/Todo/Todo";
import { ThemeContext } from "./Context/ThemeContext";

import "./App.css";

const App = () => {
  const { isDark } = useContext(ThemeContext);
  return (
    <div className={`${isDark ? "theme-dark" : "theme-light"} App`}>
      <div className="background-image" />
      <Todo />
      <span className="drag-drop-info">Drag and drop to reorder list</span>
    </div>
  );
};

export default App;
