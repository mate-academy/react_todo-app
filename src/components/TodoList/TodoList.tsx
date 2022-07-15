import React from 'react';

import { useSelector } from 'react-redux';
import { Todo } from '../../react-app-env';

import { ShowType } from '../../types/ShowType';

import { getShowBySelector, getTodosSelector } from '../../store/selectors';
import { TodoItem } from '../TodoItem';

let result: Todo[];

export const TodoList: React.FC = () => {
  const todoList = useSelector(getTodosSelector);

  const showBy = useSelector(getShowBySelector);

  console.log('render list');

  switch (showBy) {
    case ShowType.ALL:
      result = [...todoList];
      break;
    case ShowType.Completed:
      result = todoList.filter(todo => todo.completed);
      break;
    default:
      result = todoList.filter(todo => !todo.completed);
      break;
  }

  return (
    <ul className="todo-list">
      {result?.map(todo => (
        <TodoItem
          key={todo.id}
          todoElement={todo}
        />
      ))}
    </ul>
  );
};
