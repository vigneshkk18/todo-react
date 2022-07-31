import DragDropProvider from "./DragDropContext";
import FilterProvider from "./FilterContext";
import ThemeProvider from "./ThemeContext";
import TodoProvider from "./TodoContext";

const ContextWrapper = ({ children }: any) => {
  return (
    <ThemeProvider>
      <TodoProvider>
        <FilterProvider>
          <DragDropProvider>{children}</DragDropProvider>
        </FilterProvider>
      </TodoProvider>
    </ThemeProvider>
  );
};

export default ContextWrapper;
