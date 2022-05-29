import React from 'react';
import { Link } from 'react-router-dom';
import { Filter } from '../enums';

type Props = {
  todoList: Todo[];
  clearHandler: () => void;
  filter: string | undefined;
};

export const TodosFilter: React.FC<Props> = ({
  todoList,
  clearHandler,
  filter,
}) => {
  const itemsLeft = todoList.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {itemsLeft === 1 ? `${itemsLeft} item left` : `${itemsLeft} items left`}
      </span>

      <ul className="filters">

        <li>
          <Link
            to={Filter.All}
            className={
              (filter !== Filter.Active && filter !== Filter.Completed)
                ? 'selected'
                : ''
            }
          >
            All
          </Link>
        </li>

        <li>
          <Link
            className={filter === Filter.Active ? 'selected' : ''}
            to={Filter.Active}
          >
            Active
          </Link>
        </li>

        <li>
          <Link
            className={filter === Filter.Completed ? 'selected' : ''}
            to={Filter.Completed}
          >
            Completed
          </Link>

        </li>

      </ul>

      {todoList.find(todo => todo.completed === true) && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => {
            clearHandler();
          }}
        >

          Clear completed
        </button>
      )}
    </footer>

  );
};

export default TodosFilter;
