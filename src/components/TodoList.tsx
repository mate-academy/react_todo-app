import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';
import { TodoItem } from './TodoItem';
import { Filter } from '../types/Filter';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const filteredTodos = todos.filter(({ completed }) => {
    switch (filter) {
      case Filter.active:
        return !completed;
      case Filter.completed:
        return completed;
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
