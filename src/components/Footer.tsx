import { useContext } from 'react';

import { TodoContext } from '../utils/context';
import { TodoFilters } from './TodoFilters';
import { type TodoContextType } from '../types/types';

export const Footer: React.FC = () => {
  const { todos, clearCompleted } = useContext<TodoContextType>(TodoContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <TodoFilters />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
