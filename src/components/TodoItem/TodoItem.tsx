import React from 'react';
import { Todo } from '../types';

type Props = {
  todo: Todo,
  mainTodos: (todo: any) => void
};

export const TodoItem: React.FC<Props> = ({ todo, mainTodos }) => (
  <input
    type="checkbox"
    className="toggle"
    id="toggle-view"
    checked={todo.completed === true}
    onChange={() => {
      mainTodos(todo);
    }}
  />
);
