import React from 'react';
import { useTodos } from '../context/TodosContext';
import { useFilter } from '../context/FilteredTodosContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos } = useTodos();
  const { filter } = useFilter();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
