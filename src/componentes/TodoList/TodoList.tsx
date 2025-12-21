import React from 'react';
import { useTodos } from '../../context/TodoContext';
import { TodoItem } from '../TodoItem/TodoItem';
import { FILTERS } from '../../constants';

export const TodoList: React.FC = () => {
  const { todos, filter, deleteTodo, toggleTodo, updateTodo } = useTodos();

  let visibleTodos = todos;

  if (filter === FILTERS.active) {
    visibleTodos = todos.filter(todo => !todo.completed);
  } else if (filter === FILTERS.completed) {
    visibleTodos = todos.filter(todo => todo.completed);
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo}
        />
      ))}
    </section>
  );
};
