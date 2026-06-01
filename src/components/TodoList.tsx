import React from 'react';
import { useTodos } from '../context/TodoContext';
import { FilterType } from '../types/Todo';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filter } = useTodos();

  function getFilteredTodos() {
    switch (filter) {
      case FilterType.All:
        return todos;
      case FilterType.Active:
        return todos.filter(todo => !todo.completed);
      case FilterType.Completed:
        return todos.filter(todo => todo.completed);
    }
  }

  const filteredTodos = getFilteredTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos?.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </section>
  );
};
