import React from 'react';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { useTodos } from './context/TodoContext'; // <--- Імпортуємо хук

export const App: React.FC = () => {
  const { todos } = useTodos(); // Дістаємо справи з Контексту

  // Перевіряємо, чи є хоча б одна справа
  const hasTodos = todos.length > 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {/* Малюємо список і футер ТІЛЬКИ якщо є справи */}
        {hasTodos && (
          <>
            <TodoList />
            <TodoFooter />
          </>
        )}
      </div>
    </div>
  );
};
