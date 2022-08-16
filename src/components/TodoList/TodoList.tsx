/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  onUpdate: (id: number, todo: Todo | null) => void,
};

export const TodoList: React.FC<Props> = ({ todos, onUpdate }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          onUpdate={onUpdate}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
