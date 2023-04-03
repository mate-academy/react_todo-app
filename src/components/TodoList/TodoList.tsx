/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [updateId, setUpdateId] = useState<number | null>(null);

  const updateIdHandler = (value: number | null) => {
    setUpdateId(value);
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos && todos.map((todo: Todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          updateId={updateId}
          updateIdHandler={updateIdHandler}
        />
      ))}
    </ul>
  );
};
