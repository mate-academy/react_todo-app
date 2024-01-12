import React, { memo } from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

import './TodoList.scss';

type Props = {
  todos: Todo[]
};

export const TodoList:React.FC<Props> = memo(({ todos }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id.toString(10)} />
      ))}
    </ul>
  );
});
