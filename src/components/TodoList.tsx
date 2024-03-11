import React, { useContext } from 'react';
import { Filter } from '../types/Types';
import { StateContext } from '../managment/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filterBy } = useContext(StateContext);

  const filtereTodos = () => {
    switch (filterBy) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);

      case Filter.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {filtereTodos().map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
