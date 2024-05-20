import React from 'react';

import './TodoList.scss';
import { Props } from './Props';
import { TodoItem } from '../TodoItem/TodoItem';

// eslint-disable-next-line react/display-name
export const TodoList: React.FC<Props> = React.memo(({ todos }) => (
  <section className="todolist todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </section>
));
