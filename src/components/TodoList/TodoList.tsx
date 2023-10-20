import { useEffect } from 'react';
import { useTodosContext } from '../../context';
import { TodoItem } from '../TodoItem';

export const TodoList = () => {
  const {
    todos,
    visibleTodos,
    updateTodos,
    showOnlyActive,
  } = useTodosContext();

  useEffect(() => {
    updateTodos();
  }, [todos, showOnlyActive]);

  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos && (
        visibleTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))
      )}
    </ul>
  );
};
