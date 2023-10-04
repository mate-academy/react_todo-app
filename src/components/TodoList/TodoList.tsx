import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = React.memo((({
  filteredTodos,
}) => {
  return (
    <ul
      className="todo-list"
      data-cy="todosList"
    >
      {filteredTodos.map(todo => (
        <TodoItem
          todo={todo}
        />
      ))}
    </ul>
  );
}));
