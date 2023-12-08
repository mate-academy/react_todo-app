import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  list: Todo[];
};

export const TodoList: React.FC<Props> = ({ list }) => (
  <ul className="todo-list" data-cy="todosList">
    {list.map(item => {
      return (
        <TodoItem
          id={item.id}
          key={item.id}
          title={item.title}
          completed={item.completed}
        />
      );
    })}
  </ul>
);
