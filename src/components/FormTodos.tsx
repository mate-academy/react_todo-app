import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

type FormTodoProps = {
  postTodos: (s: string) => void;
  onToggleAll: () => void;
  todos: Todo[];
  isDisabledInput: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export const FormTodo: React.FC<FormTodoProps> = ({
  postTodos,
  onToggleAll,
  todos,
  isDisabledInput,
  inputRef,
  searchTerm,
  setSearchTerm,
}) => {
  const [isAllCompleted, setIsAllCompleted] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    setIsAllCompleted(todos.length > 0 && todos.every(todo => todo.completed));
  }, [todos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      return;
    } // не відправляємо порожнє

    await postTodos(searchTerm);
    setSearchTerm(''); // очищаємо поле
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${isAllCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={onToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          ref={inputRef}
          disabled={isDisabledInput}
        />
      </form>
    </header>
  );
};
