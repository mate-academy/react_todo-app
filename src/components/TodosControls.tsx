import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { TodosFilters } from './TodosFilters';
import { deleteTodos } from '../servises/deleteTodos';

export const TodosControls = () => {
  const { todos, setTodos, amountOfActive } = useContext(TodosContext);
  const isAnyComplited = todos.length - amountOfActive > 0;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${amountOfActive} items left`}
      </span>

      <TodosFilters />

      {isAnyComplited && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => deleteTodos(null, todos, setTodos)}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
