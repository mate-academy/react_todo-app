import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useTodos } from '../../context/TodosContext';

export interface TodoHeaderHandle {
  focus: () => void;
}

export const TodoHeader = forwardRef<TodoHeaderHandle>((_, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    todos,
    inputValue,
    setInputValue,
    addTodo,
    toggleAll,
    isLoading,
    registerFocus,
  } = useTodos();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    registerFocus(() => {
      inputRef.current?.focus();
    });

    return () => registerFocus(() => {});
  }, [registerFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void addTodo(inputValue);
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all${todos.every(todo => todo.completed) ? ' active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          autoFocus
          disabled={isLoading}
        />
      </form>
    </header>
  );
});

TodoHeader.displayName = 'TodoHeader';
