import React, { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { TempTodo } from './TempTodo';

type Props = {
  items: Todo[]
  tempTodo: string | null
};

export const TodoList: FC<Props> = React.memo(
  ({
    items,
    tempTodo,
  }) => {
    return (
      <ul className="todo-list" data-cy="todoList">
        {items.map(item => {
          return (
            <TodoItem
              key={item.id}
              todo={item}
            />
          );
        })}
        {tempTodo && <TempTodo value={tempTodo} /> }
      </ul>
    );
  },
);
