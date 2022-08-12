import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import { fetchDelete } from '../../api/fetchSend';

type Props = {
  filterCriteria: string | undefined
  setListOfTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  listOfTodos: Todo[];
};

export const Footer: React.FC<Props> = (
  {
    filterCriteria, setListOfTodos, listOfTodos,
  },
) => {
  const [activeNumber, setActiveNumber] = useState(0);

  useEffect(() => {
    const count = listOfTodos.filter(el => !el.completed).length;

    setActiveNumber(count);
  }, [listOfTodos]);

  const allDeleteHandler = () => {
    setListOfTodos(prev => [...prev].filter(el => {
      if (el.completed) {
        fetchDelete(el.id)
          .catch(err => {
            // eslint-disable-next-line no-console
            console.warn(err);
          });
      }

      return !el.completed;
    }));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeNumber} items left`}
      </span>

      <ul className="filters">
        <li>
          <Link to="/" className={!filterCriteria ? 'selected' : ''}>All</Link>
        </li>

        <li>
          <Link
            to="/active"
            className={filterCriteria === 'active' ? 'selected' : ''}
          >
            Active
          </Link>
        </li>

        <li>
          <Link
            to="/completed"
            className={filterCriteria === 'completed' ? 'selected' : ''}
          >
            Completed
          </Link>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={() => {
          allDeleteHandler();
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
