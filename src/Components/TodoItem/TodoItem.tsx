import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useContext,
  useEffect,
  useState,
} from "react";

import { TodoContext, Type } from "../../Context/TodoContext";
import { DragDropContext } from "../../Context/DragDropContext";

import IconButton from "../IconButton/IconButton";

import Checked from "../../assets/icon-check.svg";
import Cancel from "../../assets/icon-cross.svg";

import { ITodo } from "../TodoList/TodoList";

import "./TodoItem.css";

interface ITodoItem {
  className?: string;
  todo: ITodo;
}

const TodoItem = (props: ITodoItem) => {
  const { updateTodo } = useContext(TodoContext);
  const { onDragStart, onDragOver, reorderItem } = useContext(DragDropContext);
  const { className, todo: todoPayload } = props;
  const [todo, setTodo] = useState<ITodo>(todoPayload);
  const checked = todo.isCompleted;

  useEffect(() => {
    if (!todoPayload) return;
    setTodo((prev) => {
      const updatedPayload: any = { ...prev };
      Object.keys(todoPayload).forEach((todoKey) => {
        const value = todoPayload[todoKey as keyof ITodo];
        if (typeof value === "undefined") return;
        updatedPayload[todoKey as keyof ITodo] = value;
      });
      return updatedPayload as ITodo;
    });
  }, [todoPayload]);

  const updateLocalTodo = (type: keyof ITodo, value: any) => {
    setTodo((prev) => {
      const updatedTodo = { ...prev } as any;
      updatedTodo[type] = value;
      if (["isCompleted", "order"].includes(type) && !!todo.id) {
        saveTodo("update", updatedTodo);
      }
      return updatedTodo;
    });
  };

  const saveTodo = (type: Type, todo: ITodo) => {
    updateTodo(type, todo);
  };

  const onKeyUp = (
    event: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => {
    event.key === "Enter" && saveTodo(todo.id ? "update" : "add", todo);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={reorderItem}
      data-key={JSON.stringify({ key: todo.id, order: todo.order })}
      className={`todo-item ${className ?? ""}`}
    >
      <div
        onClick={() => updateLocalTodo("isCompleted", !checked)}
        className={`${checked ? "checked" : ""} todo-checkbox`}
      >
        {checked && <img src={Checked} alt="checked" />}
      </div>
      <input
        value={todo.text}
        placeholder={!!todo.id ? "" : "Create a new todo..."}
        onChange={(event) => updateLocalTodo("text", event.target.value)}
        onKeyUp={onKeyUp}
        type="text"
        className={`todo-input ${checked ? "completed" : ""}`}
      />
      {!!todo.id && (
        <IconButton
          onClick={() => saveTodo("delete", todo)}
          className="todo-undo"
        >
          <img src={Cancel} alt="cancel" />
        </IconButton>
      )}
    </div>
  );
};

export default TodoItem;
