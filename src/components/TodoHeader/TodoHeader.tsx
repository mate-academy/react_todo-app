import { useState, useEffect, useRef } from 'react';
import { useTodos } from '../../contexts/TodosContext';
import '../../styles/todoapp.scss';
import classNames from 'classnames';

export const TodoHeader: React.FC = () => {
  const [input, setInput] = useState('');
  const { todos, addTodo, handleMarkAllCompleted } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!input.trim()) {
      return;
    } else {
      addTodo(input.trim());
      setInput('');
    }
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={handleMarkAllCompleted}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={input}
          onChange={event => setInput(event.target.value)}
        />
      </form>
    </header>
  );
};
