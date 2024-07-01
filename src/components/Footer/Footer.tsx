import { TodoContext } from '../../context';
import { useContext } from 'react';
import { Status } from '../../types/Status';

type Props = {};

export const Footer: React.FC<Props> = () => {
  const { todos, setTodos, status, setStatus } = useContext(TodoContext);

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const activeList = todos.filter(todo => !todo.completed);
  const completedList = todos.filter(todo => todo.completed);

  return todos.length > 0 ? (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeList.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={
            'filter__link ' + (status === Status.all ? 'selected' : '')
          }
          data-cy="FilterLinkAll"
          onClick={() => setStatus(Status.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={
            'filter__link ' + (status === Status.active ? 'selected' : '')
          }
          data-cy="FilterLinkActive"
          onClick={() => setStatus(Status.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={
            'filter__link ' + (status === Status.completed ? 'selected' : '')
          }
          data-cy="FilterLinkCompleted"
          onClick={() => setStatus(Status.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedList}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  ) : (
    <></>
  );
};
