import React from 'react';
import { Todo } from '../Types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
  updateTodoStatus: (id: number, newStatus: boolean) => void;
  onDeleteTodo: (id: number) => void;
  updateTodoTitle: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  updateTodoStatus,
  onDeleteTodo,
  updateTodoTitle,
}) => {
  return (
    <>
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          updateTodoStatus={updateTodoStatus}
          onDeleteTodo={onDeleteTodo}
          todoId={todo.id}
          updateTodoTitle={updateTodoTitle}
        />
      ))}
    </>
  );
};
