/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { Todo } from '../types/todo';
import { useTodo } from '../context/TodoContext'; // Імпортуємо наш хук контексту

interface TodoItemProps {
  todo: Todo; // передаємо конкретне завдання для відображення через пропси
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  // витягуємо функції зміни та видалення з контексту
  const { toggleTodo, deleteTodo } = useTodo();

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          // функція перемикання зі станом завдання за його id
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        //  виклик. функцію видалення за id
        onClick={() => deleteTodo(todo.id)}
      >
        ×
      </button>
    </div>
  );
};
