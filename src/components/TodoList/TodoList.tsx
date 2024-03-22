import React from 'react';
import { TodoItem } from '../TodoItem.tsx/TodoItem';
import { useTodos } from '../../TodosContext';
import { Status } from '../../types/types';

export const TodoList: React.FC = () => {
  const { todos, filterStatus, setTodos } = useTodos();

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleToggleTodo = (id: number) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );

      return updatedTodos;
    });
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => handleToggleTodo(todo.id)}
          onDelete={() => handleDeleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
};
