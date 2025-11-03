import React, { useState } from 'react';
import { useTodos } from '../context/TodosContext';

const TodoHeader: React.FC = () => {
  const [title, setTitle] = useState('');
  const { addTodo, todos, toggleAll } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') {
      return;
    } // не додавати порожні завдання

    addTodo(title.trim());
    setTitle('');
  };

  return (
    <header className="todo-header">
      {todos.length > 0 && (
        <button className="toggle-all" onClick={toggleAll} data-cy="toggle-all">
          ❯
        </button>
      )}

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="todo-input"
          placeholder="Що потрібно зробити?"
          data-cy="NewTodoField" // ← обов’язково для Cypress тесту
          autoFocus
        />
      </form>
    </header>
  );
};

export default TodoHeader;
