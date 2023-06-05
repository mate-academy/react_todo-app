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
    <footer className="todoapp__footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <Filter />

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={todos.length === todosLeft}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
});
