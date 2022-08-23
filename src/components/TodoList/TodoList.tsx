import React from 'react';

import './TodoList.scss';

import { TodoItem } from '../TodoItem';
import Todo from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList" data-cy="todoList">
      {todos.map(item => (
        <TodoItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
