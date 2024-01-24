/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoItems } from '../todoitems/TodoItems';
import { StateContext } from '../../managment/Contextes';
import { Filter } from '../../types/Filter';

export const TodoList: React.FC = () => {
  const { todos, filterTp } = useContext(StateContext);

  function filter() {
    switch (filterTp) {
      case Filter.active:
        return todos.filter(todo => !todo.completed);
      case Filter.completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  return (
    <ul className="todo-list" data-cy="todoList">
      {filter().map((todo) => (
        <TodoItems key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
