import { useContext } from 'react';
import { StateContext, DispatchContext } from '../store';
import cn from 'classnames';
import { SortTodos } from '../types/type';

export const TodoFooter: React.FC = () => {
  const { todos, sortTodos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <>
      {todos.length !== 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todosLeft} items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', { selected: sortTodos === SortTodos.All })}
              data-cy="FilterLinkAll"
              onClick={() => dispatch({ type: 'setSortTodos', name: SortTodos.All })}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: sortTodos === SortTodos.Active,
              })}
              data-cy="FilterLinkActive"
              onClick={() => dispatch({ type: 'setSortTodos', name: SortTodos.Active, })}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: sortTodos === SortTodos.Completed,
              })}
              data-cy="FilterLinkCompleted"
              onClick={() =>
                dispatch({ type: 'setSortTodos', name: SortTodos.Completed, })
              }
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() => dispatch({ type: 'clearAll' })}
            disabled={todosLeft === todos.length}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
