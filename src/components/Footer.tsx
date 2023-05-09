import React, { useMemo } from 'react';
import { Todo } from '../types/Todo';
import { TodosFilter } from './TodosFilter';

type Props = {
  todos: Todo[];
  clearCompleted: () => void,
};

export const Footer:React.FC<Props> = ({
  todos,
  clearCompleted,
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
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
