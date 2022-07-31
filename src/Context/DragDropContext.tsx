import { createContext, DragEvent, useContext, useRef } from "react";

import { TodoContext } from "./TodoContext";

interface InitialState {
  reorderItem: (event: DragEvent<HTMLDivElement>) => void;
  onDragStart: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
}

const initialState: InitialState = {
  reorderItem: () => {},
  onDragStart: () => {},
  onDragOver: () => {},
};

export const DragDropContext = createContext(initialState);

interface Drag {
  key: string;
  order: number;
}

const DragDropProvider = ({ children }: any) => {
  const { todos, updateTodo } = useContext(TodoContext);

  const dragSource = useRef<Drag>();
  const dragDestination = useRef<Drag>();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    dragSource.current = JSON.parse(
      target.attributes.getNamedItem("data-key")?.value ?? "{}"
    ) as unknown as Drag;
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    dragDestination.current = JSON.parse(
      target.attributes.getNamedItem("data-key")?.value ?? "{}"
    ) as unknown as Drag;
  };

  const reorderItem = (_: DragEvent<HTMLDivElement>) => {
    if (!dragSource.current || !dragDestination.current) return;
    const { key: srcKey, order: srcOrder } = dragSource.current;
    const { key: destKey, order: destOrder } = dragDestination.current;
    console.log(srcKey, destKey);
    if (srcKey === destKey || !srcKey || !destKey) return;

    const reorderedTodos = todos.map((todo) => {
      const newTodo = { ...todo };
      if (todo.id === destKey) newTodo.order = srcOrder;
      if (todo.id === srcKey) newTodo.order = destOrder;
      return newTodo;
    });

    updateTodo("update", reorderedTodos);
    dragSource.current = undefined;
    dragDestination.current = undefined;
  };

  return (
    <DragDropContext.Provider value={{ onDragStart, onDragOver, reorderItem }}>
      {children}
    </DragDropContext.Provider>
  );
};

export default DragDropProvider;
