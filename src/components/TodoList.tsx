/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../contexts/TodosContext';
import { Tabs } from '../types/Tabs';

export const TodoList: React.FC = () => {
  const { todos, selectedFilter } = useContext(TodosContext);

  const todosToDisplay = todos.filter(todo => {
    switch (selectedFilter) {
      case Tabs.All:
        return todo;
      case Tabs.Active:
        return !todo.completed;
      case Tabs.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <ul className="todo-list" data-cy="todosList">
      {todosToDisplay.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
