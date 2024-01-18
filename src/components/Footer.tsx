import { TodoFilter } from "./TodoFilter/TodoFilter";

export const Footer = () => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        3 items left
      </span>

      <TodoFilter />

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
