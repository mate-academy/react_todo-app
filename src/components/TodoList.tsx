import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { stateContext } from '../manage/TodoContext';
import { Status } from '../types/status';

export const TodoList: React.FC = () => {
  const { todos, filterBy } = useContext(stateContext);

  const filteredTodos = () => {
    switch (filterBy) {
      case Status.ACTIVE:
        return todos.filter((todo) => !todo.completed);

      case Status.COMPLETED:
        return todos.filter((todo) => todo.completed);

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
