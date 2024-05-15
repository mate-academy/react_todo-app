import React from 'react';
import { Todo } from '../Types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </>
  );
};
