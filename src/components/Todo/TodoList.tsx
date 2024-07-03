import React from 'react';
import { Todo } from '../../types/Todo';
import { FilterOption } from '../../types/types';
import { useTodos } from './Context';
import { TodoItem } from './TodoItem';

type Props = {
  filter: FilterOption;
};

export const TodoList = React.memo(({ filter }: Props) => {
  const todos = useTodos();

  let filterCallback;

  switch (filter) {
    case FilterOption.All:
      filterCallback = () => true;
      break;
    case FilterOption.Active:
      filterCallback = (todo: Todo) => !todo.completed;
      break;
    case FilterOption.Completed:
      filterCallback = (todo: Todo) => todo.completed;
      break;
    default:
      throw new Error('Filter option is not valid!!!');
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.filter(filterCallback).map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
});

TodoList.displayName = 'TodoList';
