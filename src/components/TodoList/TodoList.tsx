import React, { useEffect, useState } from 'react';
import { TodoType } from '../../types/TodoType';
import { FilteringStatus } from '../../types/FilteringStatys';
import { Todo } from '../Todo/Todo';

type Props = {
  todoList: TodoType[];
  filteringStatus: FilteringStatus;
};

export const TodoList: React.FC<Props> = ({ todoList, filteringStatus }) => {
  const [filterTodoList, setFilterTodoList] = useState<TodoType[]>([]);

  useEffect(() => {
    switch (filteringStatus) {
      case FilteringStatus.All:
        return setFilterTodoList(todoList);

      case FilteringStatus.Active:
        return setFilterTodoList(
          [...todoList].filter(todo => todo.completed === false),
        );

      case FilteringStatus.Completed:
        return setFilterTodoList(
          [...todoList].filter(todo => todo.completed === true),
        );

      default:
        return setFilterTodoList(todoList);
    }
  }, [todoList, filteringStatus]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filterTodoList.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
