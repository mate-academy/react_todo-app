import React from 'react';
import { Todo } from '../../Types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  items: Todo[];
}

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(item => {
        const { id, title, completed }: Todo = item;

        return (
          <TodoItem
            key={id}
            title={title}
            completed={completed}
            todo={item}
          />
        );
      })}
    </ul>
  );
};
