import { useContext } from 'react';
import { FilterStatus } from '../../types/Filter';
import cn from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  filter: FilterStatus;
  changeStatusOfTodos: (value: FilterStatus) => void;
  clearCompletedTodo: () => void;
};

export const Footer: React.FC<Props> = ({
  filter,
  changeStatusOfTodos,
  clearCompletedTodo,
}) => {
  const { todos } = useContext(TodosContext);

  const todosNotCompleted = todos.filter(todo => !todo.completed);
  const todosCompleted = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosNotCompleted.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(filterItem => (
          <a
            key={filterItem}
            href={`#/${filterItem}`}
            className={cn('filter__link', {
              selected: filter === filterItem,
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => changeStatusOfTodos(filterItem)}
          >
            {filterItem}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompletedTodo}
        disabled={!todosCompleted.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
