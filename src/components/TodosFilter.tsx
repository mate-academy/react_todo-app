import cn from 'classnames';
import { TodosContext } from './TodosContext';
import { useContext } from 'react';
type SelectBy = {
  selectBy: string;
};

enum Status {
  all = '#/',
  active = '#/active',
  completed = '#/completed',
}

export const TodosFilter: React.FC<SelectBy> = ({ selectBy }) => {
  const { clearCompleted, todos } = useContext(TodosContext);
  const todosCompleted = todos.filter(todo => todo.completed);

  return (
    <>
      <ul className="filters" data-cy="todosFilter">
        <li>
          <a href="#/" className={cn({ selected: selectBy === Status.all })}>
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: selectBy === Status.active })}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: selectBy === Status.completed })}
          >
            Completed
          </a>
        </li>
      </ul>
      {todosCompleted.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </>
  );
};
