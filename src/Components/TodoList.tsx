import React from 'react';
import { Todo } from '../Types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
  updateTodoStatus: (id: number, newStatus: boolean) => void;
};

export const TodoList: React.FC<Props> = ({ todos, updateTodoStatus }) => {
  return (
    <>
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          updateTodoStatus={updateTodoStatus}
        />
      ))}
    </>
  );
};
