import { useContext } from 'react';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { DispatchContext, TodosContext } from '../../store/Store';
import { clearCompletedTodos, countPreparedItems } from '../../utils/utils';

export const Footer = () => {
  const { todos } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const countActiveTodos = countPreparedItems(todos);
  const displayButton = todos.some(todo => todo.completed === true);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {countActiveTodos} items left
      </span>

      <TodosFilter data-cy="todosFilter" />
      {displayButton && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => {
            clearCompletedTodos(todos, dispatch);
          }}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
