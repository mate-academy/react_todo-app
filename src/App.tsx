/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodosFooter';
import { ErrorNotification } from './components/ErrorNotification';
import { useTodos } from './context/TodoContext';
import { useEffect, useRef, useState } from 'react';

export const App: React.FC = () => {
  const { todos, error, clearError, add } = useTodos();

  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const hasTodos = todos.length > 0;
  const onAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      clearError();

      return;
    }

    void add(trimmedTitle).then(() => {
      setTitle('');
      setTimeout(() => inputRef.current?.focus(), 0);
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos.length]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          title={title}
          onAdd={onAdd}
          onChangeTitle={setTitle}
          inputRef={inputRef}
        />

        <TodoList />

        {hasTodos && <TodoFooter />}
      </div>

      <ErrorNotification message={error || ''} onHide={clearError} />
    </div>
  );
};
