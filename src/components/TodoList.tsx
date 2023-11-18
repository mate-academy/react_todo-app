import React from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

type Props = {
  list: Todo[],
};

export const TodoList: React.FC<Props> = ({ list }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {list.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  );
};
