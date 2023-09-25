/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../helpers/Todo';

interface Props {
  items: Todo[];
}

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
