/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoType } from '../../types/todoType';
import { Todo } from '../Todo/Todo';

type Props = {
  items: TodoType[],
  toggleTask: (value: number) => void,
  removeTask:(value: number) => void,
  onEditTitle: (todo: TodoType) => void,
};

export const TodoList: React.FC<Props> = ({
  items,
  toggleTask,
  removeTask,
  onEditTitle,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map(item => (
        <Todo
          todo={item}
          key={item.id}
          toggleTask={toggleTask}
          removeTask={removeTask}
          onEditTitle={onEditTitle}
        />
      ))}
    </ul>
  );
};
