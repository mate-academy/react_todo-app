import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { Filter } from '../Filter/Filter';

type Props = {
  todos: Todo[],
  setTodos: (data: Todo[]) => void
};

export const TodoFooter: React.FC<Props> = React.memo(({
  todos,
  setTodos,
}) => {
  const todosLeft = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const handleClearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {
          todosLeft === 1
            ? `${todosLeft} item left`
            : `${todosLeft} items left`
        }
      </span>

      <Filter />

      {todos.length !== todosLeft && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
