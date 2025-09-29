import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useTodos } from '../TodosContext';

export const TodoHeader: React.FC = () => {
  const { todos, addTodo, updateTodo } = useTodos();

  const [title, setTitle] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const allTodosCompleted = todos.every(todo => todo.completed);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      setTitle('');
      inputRef.current?.focus();

      return;
    }

    addTodo(title.trim());

    setTitle('');
  }

  function toggleAll() {
    if (allTodosCompleted) {
      todos.map(todo => {
        updateTodo({ ...todo, completed: !todo.completed });
      });
    } else {
      const noCompletedTodos = todos.filter(todo => todo.completed === false);

      noCompletedTodos.map(todo => {
        updateTodo({ ...todo, completed: !todo.completed });
      });
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
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
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
