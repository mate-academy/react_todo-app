// import { useContext } from 'react';
// import { TodoContext } from '../../context';
// import { Todo } from '../../types/Todo';

import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setStatus: (sortType: Status) => void;
  status: Status;
  clearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  setStatus,
  status,
  clearCompleted,
}) => {
  // const { todos, setTodos } = useContext<Todo[]>(TodoContext);
  const activeList = todos.filter(todo => !todo.completed);
  const completedList = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeList.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
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

      {/* this button should be disabled if there are no completed todos */}
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
  );
};
