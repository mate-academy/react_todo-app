import { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodosFilter } from './TodosFilter';

type Props = {
  todos: Todo[],
  onTodoDelete: (todoIds: number[]) => void;
};

export const Footer: FC<Props> = ({
  todos,
  onTodoDelete,
}) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const completedTodosCount = completedTodos.length;
  const activeTodosCount = todos.length - completedTodosCount;
  const handleClearCompleted = () => {
    const idsToDelete = completedTodos.map(todo => todo.id);

    onTodoDelete(idsToDelete);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {
          activeTodosCount === 1
            ? '1 item left'
            : `${activeTodosCount} items left`
        }
      </span>

      <TodosFilter />

      <button
        type="button"
        className="clear-completed"
        onClick={handleClearCompleted}
      >

        Clear completed
      </button>
    </footer>
  );
};
