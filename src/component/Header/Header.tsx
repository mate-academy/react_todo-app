import { useEffect, useRef, useState } from 'react';
import {
  useAddTodo,
  useTodos,
  useUpdateTodos,
} from '../../context/TodosContext';

export const Header = () => {
  const { todos } = useTodos();
  const [query, setQuery] = useState('');

  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodos();

  const allHandelerTogle = () => {
    const allCompleted = todos.every(td => td.completed);
    const updated = todos.map(td => ({
      ...td,
      completed: !allCompleted,
    }));

    updateTodo(updated);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos && todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${todos?.filter(todo => todo.completed === true).length === todos.length ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => allHandelerTogle()}
        />
      )}
      {/* Add a todo on form submit */}
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!query) {
            return;
          }

          addTodo({
            id: +new Date(),
            title: query.trim(),
            completed: false,
          });
          setQuery('');
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
          ref={inputRef}
          autoFocus={true}
        />
      </form>
    </header>
  );
};
