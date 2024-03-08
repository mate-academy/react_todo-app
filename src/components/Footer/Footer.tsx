import React from 'react';
import { TodosContext } from '../../utils/TodosContext';
import TodoFilter from '../TodoFilter/TodoFilter';

const Footer: React.FC = () => {
  const { todos, setTodos, setFilter } = React.useContext(TodosContext);

  const isClearButtonVisible = todos.some(todo => todo.completed);

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const amountItemsLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {amountItemsLeft} items left
      </span>

      <TodoFilter setFilter={setFilter} />

      {isClearButtonVisible && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
