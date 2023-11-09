import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { StateContext } from './Store';
import { FilterContext } from './FilterContext';

export const TodoList: React.FC = () => {
  const state = useContext(StateContext);
  const { filter } = useContext(FilterContext);
  const filterField = () => {
    const { all, active, completed } = filter;

    if (all) {
      return state;
    }

    if (active) {
      return state.filter(item => item.completed === false);
    }

    if (completed) {
      return state.filter(item => item.completed === true);
    }

    return state;
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {filterField().map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
