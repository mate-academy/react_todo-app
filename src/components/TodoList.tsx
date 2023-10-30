/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../contexts/TodosContext';

export const TodoList: React.FC = () => {
  const { todosToDisplay } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {todosToDisplay.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
