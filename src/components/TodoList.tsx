import React from 'react';
import { TodoItem } from './TodoItem';
import { State } from '../types/State';
import { Status } from '../types/Filter';

type Props = {
  items: State,
};

export const TodoList: React.FC<Props> = ({ items: { todos, filtred } }) => {
  let todosForSowing = todos;

  switch (filtred) {
    case Status.activ:
      todosForSowing = todos.filter(todo => !todo.completed);
      break;

    case Status.completed:
      todosForSowing = todos.filter(todo => todo.completed);
      break;

    default:
      todosForSowing = todos;
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
