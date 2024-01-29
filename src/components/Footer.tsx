import React, { useContext } from 'react';
import { TodosFilter } from './TodosFilter';
import { Status } from '../types/status';
import { TodosContext } from './TodosContext';

type Props = {
  count: number;
  currentStatus: Status;
  onChange:(status: Status) => void;
};

export const Footer: React.FC<Props> = ({ count, currentStatus, onChange }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const hasCompletedTodos = todos.some(todo => todo.completed);

  const deleteCompletedTask = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    setTodos(activeTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${count} item${count !== 1 &&  count !== 0 ? 's' : ''} left`}
      </span>

      <TodosFilter currentStatus={currentStatus} onChange={onChange} />
      {hasCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={deleteCompletedTask}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
