import { useContext } from 'react';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { DispatchContext, TodosContext } from '../../store/Store';
import { clearCompletedTodos, countPreparedItems } from '../../utils/utils';

export const Footer = () => {
  const { todos } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const numberOfActiveTodos = countPreparedItems(todos);
  const disableButton = todos.some(todo => todo.completed === true);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {numberOfActiveTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <TodosFilter />

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!disableButton}
        onClick={() => {
          clearCompletedTodos(todos, dispatch);
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
