/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';
import { Todo } from '../types/Todo';

export const TodoList: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};
