import { createContext, useCallback, useEffect, useState } from "react";
import { ITodo } from "../Components/TodoList/TodoList";

interface IInitialState {
  todos: ITodo[];
  updateTodo: (type: Type, todo: ITodo | ITodo[] | undefined) => void;
  syncChanges: () => void;
}

const initialState: IInitialState = {
  todos: [],
  updateTodo: () => {},
  syncChanges: () => {},
};

export type Type = "add" | "update" | "delete" | "clear";

export const TodoContext = createContext(initialState);

const sortByOrder = (todo1: ITodo, todo2: ITodo) => {
  if (todo1.order > todo2.order) return 1;
  if (todo1.order < todo2.order) return -1;
  return 0;
};

function TodoProvider({ children }: any) {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [pullChanges, setPullChanges] = useState(true);

  const fetchTodos = useCallback(async () => {
    fetch("http://localhost:3001/todo", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((todos: ITodo[]) => {
        setTodos(todos.sort(sortByOrder));
      });
  }, []);

  useEffect(() => {
    if (!pullChanges) return;
    fetchTodos();
    setPullChanges(false);
  }, [todos, fetchTodos, pullChanges]);

  const syncChanges = () => setPullChanges(true);

  const updateTodo = async (type: Type, todo: ITodo | ITodo[] | undefined) => {
    if (!todo && type !== "clear") return;
    let url = "http://localhost:3001/todo";
    let method = "POST";
    let body = JSON.stringify(todo);

    if (type === "clear") method = "DELETE";

    if (type === "delete" && !(todo instanceof Array) && todo) {
      method = "DELETE";
      url = `${url}/${todo.id}`;
    }
    if (type === "add") method = "POST";
    if (type === "update") method = "PUT";

    await fetch(url, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    syncChanges();
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        updateTodo,
        syncChanges,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
