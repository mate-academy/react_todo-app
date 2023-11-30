import React from 'react';
import { TodoItem } from './TodoItem';
import { Status } from '../types/Filter';
import { ToDo } from '../types/todo';

type Props = {
  items: ToDo[],
  filtred: Status,
};

export const TodoList: React.FC<Props> = ({ items, filtred }) => {
  let todosForSowing = items;

  switch (filtred) {
    case Status.activ:
      todosForSowing = items.filter(todo => !todo.completed);
      break;

    case Status.completed:
      todosForSowing = items.filter(todo => todo.completed);
      break;

    default:
      todosForSowing = items;
      break;
  }

  return (
    <ul className="todo-list" data-cy="todosList">
      {todosForSowing.map(item => (
        <TodoItem
          item={item}
          key={item.id}
        />
      ))}
    </ul>
  );
};
