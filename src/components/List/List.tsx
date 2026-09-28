/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useGlobalState } from '../../GlobalProvider';
import { TodoComponent } from '../TodoComponent/TodoComponent';
import { FilterCriteria } from '../../types/FilterCriteria';

export const List: React.FC = () => {
  const { todos, selectedFilter } = useGlobalState();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos
        .filter(todo => {
          switch (selectedFilter) {
            case FilterCriteria.ALL:
              return true;
            case FilterCriteria.ACTIVE:
              return todo.completed === false;
            case FilterCriteria.COMPLETED:
              return todo.completed === true;
          }
        })
        .map(todo => {
          return <TodoComponent todo={todo} key={todo.id} />;
        })}
    </section>
  );
};
