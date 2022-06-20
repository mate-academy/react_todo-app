import React from 'react';
// eslint-disable-next-line import/no-cycle
import { TodoItem } from '../TodoItem';
import { TodosType } from '../../types/TodosType';

type Props = {
  items: TodosType[];
  sortBy: string;
};

export const TodoList: React.FC<Props> = ({
  items,
  sortBy,
}) => {
  let visibleTodos = [...items];

  switch (sortBy) {
    case 'active':
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
      break;
    case 'completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed === true);
      break;
    default:
      break;
  }

  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos && visibleTodos.map(item => (
        <TodoItem
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  );
};
