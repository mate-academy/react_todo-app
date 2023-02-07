import { FC, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosFilter } from './TodosFilter';

type Props = {
  todos: Todo[],
  onTodoDelete: (todoIds: number[]) => void;
};

export const Footer: FC<Props> = ({ todos, onTodoDelete }) => {
  const [activeTodosCount, setActiveTodosCount] = useState(0);
  const [completedTodosCount, setCompletedTodosCount] = useState(0);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleCompletedTodos = () => {
    const finishedTodos = todos.filter(todo => todo.completed);

    setCompletedTodosCount(finishedTodos.length);
    setCompletedTodos(finishedTodos);
  };

  const handleClearCompleted = () => {
    const idsToDelete = completedTodos.map(todo => todo.id);

    onTodoDelete(idsToDelete);
  };

  const handleActiveTodosCount = () => {
    const countActive = todos.filter(todo => !todo.completed).length;

    setActiveTodosCount(countActive);
  };

  useEffect(() => {
    handleActiveTodosCount();
    handleCompletedTodos();
  }, [todos]);

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

      {(completedTodosCount > 0) && (
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
