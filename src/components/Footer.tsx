import { useContext } from 'react';
import { DispatchContext, TodosContext } from '../TodosContext';

export const Footer: React.FC = () => {
  const {
    todos,
    selectedAll,
    selectedActive,
    selectedCompleted,
  } = useContext(TodosContext);

  const dispatch = useContext(DispatchContext);

  // eslint-disable-next-line max-len
  const todosNotComlete = todos.filter(todo => todo.completed === false);

  const numberNotComleteTodo = todosNotComlete.length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${numberNotComleteTodo} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={`${selectedAll && 'selected'}`}
            onClick={(event) => {
              event.preventDefault();
              dispatch({ type: 'selectedAll' });
            }}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={`${selectedActive && 'selected'}`}
            onClick={(event) => {
              event.preventDefault();
              dispatch({ type: 'selectedActive' });
            }}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={`${selectedCompleted && 'selected'}`}
            onClick={(event) => {
              event.preventDefault();
              dispatch({ type: 'selectedCompleted' });
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={() => dispatch({ type: 'removeTodosCompleted' })}
      >
        Clear completed
      </button>
    </footer>
  );
};
