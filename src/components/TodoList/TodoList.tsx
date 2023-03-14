import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { FilterCompleted } from '../../types/FilterCompleted';
import { User } from '../../types/User';

type Props = {
  user: User;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  setError: (error: boolean) => void;
};

export const TodoList: React.FC<Props> = React.memo(({
  user,
  todos,
  setTodos,
  setError,
}) => {
  const { pathname } = useLocation();

  const visibleTodos = useMemo(() => {
    switch (pathname) {
      case FilterCompleted.ACTIVE:
        return todos.filter(({ completed }) => !completed);
      case FilterCompleted.COMPLETED:
        return todos.filter(({ completed }) => completed);
      case FilterCompleted.ALL:
        return todos;
      default:
        return [];
    }
  }, [todos, pathname]);

  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map(todo => (
        <TodoItem
          user={user}
          todo={todo}
          key={todo.id}
          todos={todos}
          setTodos={setTodos}
          setError={setError}
        />
      ))}
    </ul>
  );
});
