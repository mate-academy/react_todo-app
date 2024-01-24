import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { StateContext } from '../management/TodoContext';
import { Filter } from '../types/Filter';

export const TodoList: React.FC = () => {
  const { todos, filterBy } = useContext(StateContext);

  const filteredTodos = () => {
    switch (filterBy) {
      case Filter.active:
        return todos.filter(todo => !todo.completed);

      case Filter.completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {
        filteredTodos().map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))
      }
    </ul>
  );
};
