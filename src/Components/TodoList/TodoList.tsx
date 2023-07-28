import React from 'react';

import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../Types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo: Todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
