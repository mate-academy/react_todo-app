/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../contexts/TodosContext';

export const TodoList: React.FC = () => {
  const [todos, _] = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
