import React from 'react';

import { FILTERS, FilterType } from '../constants/filters';
import { useTodos } from '../context/TodosContext';
import { TodoItem } from './TodoItem';

interface Props {
  filter: FilterType;
  focusNewTodoField: () => void;
}

export const TodoList: React.FC<Props> = ({ filter, focusNewTodoField }) => {
  const { todos } = useTodos();

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case FILTERS.active:
        return !todo.completed;

      case FILTERS.completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          focusNewTodoField={focusNewTodoField}
        />
      ))}
    </section>
  );
};
