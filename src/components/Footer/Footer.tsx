import { useContext } from 'react';

import { TodosContext } from '../TodosContext';
import { TodosFilter } from '../TodosFilter';

type Props = {};

export const Footer: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const count = todos.filter(({ completed }) => !completed).length;
  const isComletedTodos = todos.some(({ completed }) => completed);

  const handleClickDelete = () => {
    const modifiedTodos = todos.filter(todo => !todo.completed);

    setTodos(modifiedTodos);
  };

  return (

    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {count > 1 ? (
          `${count} items left`
        ) : (
          `${count} item left`
        )}
      </span>

      <TodosFilter />

      {isComletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClickDelete}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
