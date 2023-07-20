import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Main } from './Main/Main';
import { Filter } from './components/Filter';
import { useLocalStorage } from './utils/hooks/useLocalStorage';
import { RegistrationForm } from './components/RegistrationForm';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [processingIds, setProcessingIds] = useState<number[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem('userData');

    if (!storage) {
      setShowForm(true);
    } else {
      const { password, email } = JSON.parse(storage);

      if (!password || !email) {
        setShowForm(true);
      }
    }
  }, []);

  useEffect(() => {
    if (processingIds.length) {
      setTimeout(() => setProcessingIds([]), 500);
    }
  }, [processingIds.length]);

  return (
    <div className="todoapp">
      {showForm ? (<RegistrationForm setShowForm={setShowForm} />)
        : (
          <>
            <Header
              todos={todos}
              setTodos={setTodos}
              setProcessingIds={setProcessingIds}
              processingIds={processingIds}
            />
            <Main
              todos={todos}
              setTodos={setTodos}
              setProcessingIds={setProcessingIds}
              processingIds={processingIds}
            />
            {!!todos.length && <Filter todos={todos} setTodos={setTodos} />}
          </>
        )}

    </div>
  );
};
