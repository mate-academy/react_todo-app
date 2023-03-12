import React, { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { FilterCompleted } from '../../types/FilterCompleted';

type Props = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setError: (error: boolean) => void;
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  setTodos,
  setError,
}) => {
  const { pathname } = useLocation();

  const visibleTodos = todos.filter((todo) => {
    switch (pathname) {
      case FilterCompleted.ACTIVE:
        return !todo.completed;
      case FilterCompleted.COMPLETED:
        return todo.completed;
      default:
        return todos;
    }
  });

  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          setTodos={setTodos}
          setError={setError}
        />
      ))}
    </ul>
  );
});
