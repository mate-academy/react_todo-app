import classNames from 'classnames';
import { SelectedFilter } from '../types/SelectedFilter';
import { Todo } from '../types/Todo';
import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

type Props = {
  selectedFilter: SelectedFilter;
  setSelectedFilter: (filter: SelectedFilter) => void;
};

export const Footer: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const { todos, setTodos } = useContext(TodosContext);

  const itemLeft: number = todos.filter(todo => !todo.completed).length;
  const completedTodos: Todo[] = todos.filter(todo => todo.completed);

  function deleteCompletedTodos() {
    const newTodos: Todo[] = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  }

  return (
    !!todos.length && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {itemLeft} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          {Object.values(SelectedFilter).map(button => {
            return (
              <a
                key={button}
                href={button === SelectedFilter.all ? '#/' : `#/${button}`}
                className={classNames('filter__link', {
                  selected: selectedFilter === button,
                })}
                data-cy={`FilterLink${button}`}
                onClick={() => setSelectedFilter(button)}
              >
                {button}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={completedTodos.length === 0}
          onClick={deleteCompletedTodos}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};
