import { FC, useState, useEffect } from 'react';
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
    const doneTodos = todos.filter(todo => todo.completed);

    setCompletedTodosCount(doneTodos.length);
    setCompletedTodos(doneTodos);
  };

  const handleClearCompleted = () => {
    const todoIdsToDelete = completedTodos.map(todo => todo.id);

    onTodoDelete(todoIdsToDelete);
  };

  const handleActiveTodosCount = () => {
    const activeCount = todos.filter(todo => !todo.completed).length;

    setActiveTodosCount(activeCount);
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
