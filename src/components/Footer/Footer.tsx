import classNames from 'classnames';
import { useCallback } from 'react';
import { deleteTodo } from '../../api/todos';
import { Error } from '../../types/Error';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { Filters } from '../Filters';

type Props = {
  todos: Todo[],
  setTodos: (arg: Todo[]) => void,
  filter: Status,
  setFilter: (arg: Status) => void,
  setIsError: (arg: Error | null) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  setTodos,
  filter,
  setFilter,
  setIsError,
}) => {
  const checkCompletedTodos = () => {
    return todos.some(todo => todo.completed);
  };

  const removeAllCompletedTodos = useCallback(() => {
    if (!todos) {
      return;
    }

    Promise.all(
      todos.map(async (todo) => {
        if (todo.completed) {
          await deleteTodo(todo.id)
            .then(() => setTodos(todos.filter(item => !item.completed)))
            .catch(() => setIsError(Error.Delete));
        }
      }),
    );
  }, [todos]);

  const getNumberOfLeftItems = () => {
    let number = 0;

    todos.forEach((todo) => {
      if (!todo.completed) {
        number += 1;
      }
    });

    return number;
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${getNumberOfLeftItems()} items left`}
      </span>

      <Filters
        setFilter={setFilter}
        filter={filter}
      />

      <button
        type="button"
        className={classNames(
          'clear-completed',
          { 'clear-completed-hidden': !checkCompletedTodos() },
        )}
        onClick={removeAllCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
