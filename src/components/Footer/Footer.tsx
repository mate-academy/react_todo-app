import React, { useContext, useMemo } from 'react';
import { TodosContext } from '../../Store';
import { TodosFilter } from '../TodosFilter';

interface Props {
  clearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({ clearCompleted }) => {
  const { todos } = useContext(TodosContext);

  const getNotCompletedTodos = useMemo(() => {
    return todos.filter(({ completed }) => completed === false);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter(({ completed }) => completed);
  }, [todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${getNotCompletedTodos.length} items left`}
      </span>

      <TodosFilter />

      {completedTodos.length >= 1 && (
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
