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
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);

    setTodos(updatedTodos);
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
