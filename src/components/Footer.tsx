import React from 'react';
import { TodosContext } from '../utils/context';

interface Props {
  // filterActive: () => void;
  // filterCompleted: () => void;
  filter: (parameter: string) => void;
}

export const Footer: React.FC<Props> = ({
  // filterActive,
  // filterCompleted
  filter,
}) => {
  const todos = React.useContext(TodosContext);
  // eslint-disable-next-line max-len
  const uncompleted = todos?.filter((todo) => todo.completed === false);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompleted?.length === 1 ? '1 item left' : `${uncompleted?.length} items left`}`}
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected" onClick={() => filter('all')}>
            All
          </a>
        </li>

        <li>
          {/* <a href="#/active" onClick={filterActive}>Active</a> */}
          <a href="#/active" onClick={() => filter('active')}>Active</a>
        </li>

        <li>
          {/* <a href="#/completed" onClick={filterCompleted}>Completed</a> */}
          <a href="#/completed" onClick={() => filter('completed')}>
            Completed
          </a>
        </li>
      </ul>

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
