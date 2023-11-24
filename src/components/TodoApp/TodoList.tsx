import React, { useContext } from 'react';
import { Filter } from '../../types/Filter';
import { StateContext } from '../Provaider/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filterBy } = useContext(StateContext);

  const filtredTodos = () => {
    switch (filterBy) {
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {
        filtredTodos().map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))
      }
    </ul>
  );
};
