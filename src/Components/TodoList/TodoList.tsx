import React from 'react';

import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../Types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
