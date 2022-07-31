import { useContext } from "react";

import { FilterContext, FilterType } from "../../Context/FilterContext";
import { TodoContext } from "../../Context/TodoContext";

import "./TodoFooter.css";

const TodoFooter = () => {
  const { updateTodo } = useContext(TodoContext);
  const {
    filterType,
    filteredTodos: todos,
    setFilterType,
  } = useContext(FilterContext);

  const updateFilterType = (type: FilterType) => {
    if (filterType === type) return;
    setFilterType(type);
  };

  return (
    <div className="todo-footer">
      <span>{todos.length} items left</span>
      <div className="todo-filter">
        <button
          onClick={() => updateFilterType("All")}
          className={`${filterType === "All" ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => updateFilterType("Active")}
          className={`${filterType === "Active" ? "active" : ""}`}
        >
          Active
        </button>
        <button
          onClick={() => updateFilterType("Completed")}
          className={`${filterType === "Completed" ? "active" : ""}`}
        >
          Completed
        </button>
      </div>
      <button onClick={() => updateTodo("clear", undefined)}>
        Clear Completed
      </button>
    </div>
  );
};

export default TodoFooter;
