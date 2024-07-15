import { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { SelectedStatus } from '../types/SelectedTypes';
import cn from 'classnames';

type FooterProps = {
  selectedStatus: string;
  setTodoStatus: (e: React.MouseEvent<HTMLElement>) => void;
};
export const Footer: React.FC<FooterProps> = ({
  selectedStatus,
  setTodoStatus,
}) => {
  const { todos, setTodos } = useContext(TodoContext);

  const numOfCompletedTodos = todos.reduce(
    (count, todo) => count + (todo.completed ? 1 : 0),
    0,
  );

  const numOfActiveTodos = todos.length - numOfCompletedTodos;

  const handleDeleteAllCompletedTodos = () => {
    const todosToDelete = todos.filter(todo => todo.completed);

    setTodos(currentTodos =>
      currentTodos.filter(todo => !todosToDelete.includes(todo)),
    );

    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }
  };

  return (
    <>
      {!!todos.length && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {`${numOfActiveTodos} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            {Object.values(SelectedStatus).map(status => (
              <a
                key={status}
                href="#/"
                className={cn('filter__link', {
                  selected: selectedStatus === status,
                })}
                data-cy={`FilterLink${status}`}
                onClick={setTodoStatus}
              >
                {status}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={handleDeleteAllCompletedTodos}
            disabled={numOfCompletedTodos === 0}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
