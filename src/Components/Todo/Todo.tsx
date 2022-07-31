import { useContext } from "react";

import { TodoContext } from "../../Context/TodoContext";
import { ThemeContext } from "../../Context/ThemeContext";

import TodoItem from "../TodoItem/TodoItem";
import TodoList from "../TodoList/TodoList";
import IconButton from "../IconButton/IconButton";

import Sun from "../../assets/icon-sun.svg";
import Moon from "../../assets/icon-moon.svg";

import "./Todo.css";

const Todo = () => {
  const { todos } = useContext(TodoContext);
  const { isDark, toggleDark } = useContext(ThemeContext);

  return (
    <div className="todo">
      <div className="header">
        <span className="title">TODO</span>
        <IconButton onClick={toggleDark}>
          <img src={isDark ? Sun : Moon} alt={isDark ? "sun" : "moon"} />
        </IconButton>
      </div>
      <TodoItem
        className="todo-new"
        todo={{
          text: "",
          isCompleted: false,
          id: "",
          order: todos.length + 1,
        }}
      />
      <TodoList />
    </div>
  );
};

export default Todo;
