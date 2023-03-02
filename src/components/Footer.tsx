import { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodosFilter } from './TodosFilter';

type Props = {
  todos: Todo[],
  onTodoDelete: (todoIds: number[]) => void;
};

export const Footer: FC<Props> = ({ todos, onTodoDelete }) => {
  const doneTodos = todos.filter(todo => todo.completed);
  const activeCount = todos.filter(todo => !todo.completed).length;
  const handleClearCompleted = () => {
    const todoIdsToDelete = doneTodos.map(todo => todo.id);

    onTodoDelete(todoIdsToDelete);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        { activeCount === 1 ? '1 item left' : `${activeCount} items left` }
      </span>

      <TodosFilter />

      {(doneTodos.length > 0) && (
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
};
