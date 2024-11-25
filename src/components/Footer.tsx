import classNames from 'classnames';
import { Filter } from '../types/Filter';
import { useTodoContext } from './TodoContext';
import { deleteTodo } from '../api/todos';
import { focusInput } from '../utils/services';
import { Todo } from '../types/Todo';

type Props = {};

export const Footer: React.FC<Props> = () => {
  const {
    todos,
    setTodos,
    showError,
    setActiveTodoId,
    inputRef,
    filter,
    setFilter,
  } = useTodoContext();

  const hasCompleted = todos.some(todo => todo.completed);

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const handleClearCompleted = async () => {
    const completedTodoIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    Promise.allSettled(
      completedTodoIds.map(async todoId => {
        try {
          await deleteTodo(todoId);

          setTodos((currentTodos: Todo[]) =>
            currentTodos.filter(todo => todo.id !== todoId),
          );
        } catch {
          showError('Unable to delete a todo');
        } finally {
          setActiveTodoId(null);
          focusInput(inputRef);
        }
      }),
    );
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filterValue => (
          <a
            key={filterValue}
            href={`#/${filterValue}`}
            className={classNames('filter__link', {
              selected: filter === filterValue,
            })}
            data-cy={`FilterLink${filterValue.charAt(0).toUpperCase() + filterValue.slice(1)}`}
            onClick={() => handleFilterChange(filterValue)}
          >
            {filterValue.charAt(0).toUpperCase() + filterValue.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
