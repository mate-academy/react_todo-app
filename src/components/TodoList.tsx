import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
import { useTodos } from '../hooks/useTodo';

export const TodoList: React.FC = () => {
  const { filteredTodos, status } = useTodos();

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos(status).map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};
