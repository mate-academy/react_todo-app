import React, { useMemo } from 'react';
import { Todo } from '../types/Todo';
import { TodosFilter } from './TodosFilter';

type Props = {
  todos: Todo[];
  onClearCompleted: () => void,
};

export const Footer:React.FC<Props> = ({
  todos,
  onClearCompleted,
}) => {
  const uncompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodos} items left`}
      </span>

      <TodosFilter />

      {!!completedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
