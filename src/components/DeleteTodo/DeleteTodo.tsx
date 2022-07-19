import React from 'react';
import { Todo } from '../types';

type Props = {
  todo: Todo,
  todos: Todo[],
  todosCall: (newTodo: Todo[]) => void
};

export const DeleteTodo: React.FC<Props> = ({ todo, todos, todosCall }) => (
  <button
    type="button"
    className="destroy"
    onClick={() => {
      todosCall(todos.filter(item => item.id !== todo.id));
    }}
  />
);
