import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { TodoContext } from "./TodoContext";

import { ITodo } from "../Components/TodoList/TodoList";

export type FilterType = "All" | "Active" | "Completed";

interface InitialState {
  filterType: FilterType;
  setFilterType: Dispatch<SetStateAction<FilterType>>;
  filteredTodos: ITodo[];
}

const initialState: InitialState = {
  filterType: "All",
  setFilterType: () => {},
  filteredTodos: [],
};

export const FilterContext = createContext(initialState);

const FilterProvider = ({ children }: any) => {
  const { todos } = useContext(TodoContext);

  const [filterType, setFilterType] = useState<FilterType>("All");
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    let filteredTodos = [...todos];
    if (filterType === "Active") {
      filteredTodos = filteredTodos.filter((todo) => !todo.isCompleted);
    }
    if (filterType === "Completed") {
      filteredTodos = filteredTodos.filter((todo) => todo.isCompleted);
    }
    if (filterType === "All") filteredTodos = [...todos];
    setFilteredTodos(filteredTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, todos]);

  return (
    <FilterContext.Provider
      value={{ filterType, setFilterType, filteredTodos }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
