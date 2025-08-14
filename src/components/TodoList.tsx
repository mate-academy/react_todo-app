import React from 'react';
import { FilterType } from '../types/FilterType';
import { TodoItem } from './TodoItem';
import { useTodos } from '../TodosContext';

export const TodoList: React.FC = () => {
  const {
    todos,
    loadingTodoIds,
    deleteTodo,
    updateTodo,
    currentFilter,
    setErrorMessage,
  } = useTodos();

  const filteredTodos = todos.filter(todo => {
    switch (currentFilter) {
      case FilterType.all:
        return true;

      case FilterType.active:
        return !todo.completed;

      case FilterType.completed:
        return todo.completed;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo, i) => (
        <TodoItem
          key={todo.id + new Date().getTime() + i}
          todo={todo}
          deleteTodo={deleteTodo}
          isLoading={loadingTodoIds.includes(todo.id)}
          updateTodo={newTodo => updateTodo(newTodo)}
          setErrorMessage={setErrorMessage}
        />
      ))}
    </section>
  );
};
