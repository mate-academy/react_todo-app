import React from 'react';
import { useTodos } from '../context/TodoContext';

export const TodoFooter: React.FC = () => {
  // Дістаємо всі потрібні змінні та функції з Контексту
  const { todos, filter, setFilter, clearCompleted } = useTodos();

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  // Перевіряємо, чи є хоча б одна виконана справа
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('all')}
        >
          All
        </a>
        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('active')}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted} // Кнопка вимикається, якщо виконаних справ немає
        onClick={clearCompleted} // Запускаємо очищення
      >
        Clear completed
      </button>
    </footer>
  );
};
