import { FormEvent, memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useInput } from './hooks/useInput';
import { useTodos } from './hooks/useTodos';

export const TodosHeader: React.FC = memo(() => {
  const { todos, addTodo, globalList, changeAllTodosStatus } = useTodos();
  const { value: newTodo, handleChange, reset } = useInput('');

  const notCompletedTodos = todos.filter(todo => todo.completed === false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (newTodo.trim()) {
      addTodo(newTodo);
      reset();
    }
  };

  return (
    <header className="todoapp__header">
      {globalList.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: notCompletedTodos.length === 0 && globalList.length > 0,
          })}
          data-cy="ToggleAllButton"
          onClick={changeAllTodosStatus}
        />
      )}

      <form onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={handleChange}
        />
      </form>
    </header>
  );
});

TodosHeader.displayName = 'TodosHeader';
