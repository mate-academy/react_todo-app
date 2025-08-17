import React from 'react';
import { FilterType } from '../types/FilterType';
import { TodoItem } from './TodoItem';
import { useTodos } from '../TodosContext';

export const TodoList: React.FC = () => {
  const {
    todos,
    loadingTodoIds,
    deleteTodoFromList,
    updateTodoInList,
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
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodoFromList}
          isLoading={loadingTodoIds.includes(todo.id)}
          updateTodo={newTodo => updateTodoInList(newTodo)}
          setErrorMessage={setErrorMessage}
        />
      ))}
    </section>
  );
};
