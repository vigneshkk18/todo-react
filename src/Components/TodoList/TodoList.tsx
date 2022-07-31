import { useContext } from "react";

import TodoFooter from "../TodoFooter/TodoFooter";
import TodoItem from "../TodoItem/TodoItem";

import { FilterContext } from "../../Context/FilterContext";

import "./TodoList.css";

export interface ITodo {
  id: string;
  text: string;
  order: number;
  isCompleted: boolean;
}

const TodoList = () => {
  const { filteredTodos: todos } = useContext(FilterContext);

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <TodoFooter />
    </div>
  );
};

export default TodoList;
