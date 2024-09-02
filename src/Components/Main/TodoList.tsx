import React from 'react';
import { Todo } from '../../Types/todo';
import { TodoItem } from './TodoItem';

type Props = {
  handleChange: (todoId: number, todoCompleted: boolean) => void;
  visibleTodos: Todo[];
  deleteTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ handleChange, visibleTodos, deleteTodo }) => {
  return (
    <>
      {visibleTodos.map(todo => (
        <TodoItem
          todo={todo}
          handleChange={handleChange}
          key={todo.id}
          deleteTodo={deleteTodo}
        />
      ))}
    </>
  );
};
