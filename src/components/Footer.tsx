import { Filter } from '../types/Filter';
import { useDispatch, useGlobalState } from '../GlobalProvider';
import cn from 'classnames';

export const Footer: React.FC = () => {
  const { todos, filter } = useGlobalState();
  const dispatch = useDispatch();

  const completedTodos = todos.filter(todo => todo.completed);
  const notCompletedTodos = todos.filter(todo => !todo.completed).length;

  const deleteCompleted = () => {
    completedTodos.forEach(todo => {
      dispatch({ type: 'deleteTodo', payload: todo.id });
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === Filter.All })}
          data-cy="FilterLinkAll"
          onClick={() => dispatch({ type: 'setFilter', payload: Filter.All })}
        >
          {Filter.All}
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === Filter.Active })}
          data-cy="FilterLinkActive"
          onClick={() =>
            dispatch({ type: 'setFilter', payload: Filter.Active })
          }
        >
          {Filter.Active}
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === Filter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() =>
            dispatch({ type: 'setFilter', payload: Filter.Completed })
          }
        >
          {Filter.Completed}
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length < 1}
        onClick={deleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
