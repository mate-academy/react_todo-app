import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
import { TodoContext } from '../context/TodoContext';

export const TodoList: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
