import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[],
  deleteTodo: (id: number) => void;
  togleStatus: (
    id: number,
    completed: boolean) => void;
  changeInputText: (id: number, query: string) => void;
};

export const TodoList:React.FC<Props> = ({
  todos,
  deleteTodo,
  togleStatus,
  changeInputText,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo: Todo) => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          togleStatus={togleStatus}
          deleteTodo={deleteTodo}
          changeInputText={changeInputText}
        />
      ))}
    </ul>
  );
};
