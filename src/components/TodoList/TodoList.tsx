import React from 'react';

import './TodoList.scss';
import { Props } from './types/Props';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC<Props> = ({ todos, active }) => (
  <section className="todolist todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} active={active} />
    ))}
  </section>
);
