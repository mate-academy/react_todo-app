import { useState } from 'react';
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

  const toggleAllHandler = () => {
    const tod =
      todos.filter(td => !td.completed).length === 0
        ? todos
        : todos.filter(td => !td.completed);

    tod.forEach(td => {
      todos.map(t =>
        t.id === td.id ? { ...td, completed: !td.completed } : t,
      );
    });

    return updateTodo(tod);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos && todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${todos?.filter(todo => todo.completed === true).length === todos.length ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => {
            toggleAllHandler();
          }}
        />
      )}
      {/* Add a todo on form submit */}
      <form
        onSubmit={e => {
          e.preventDefault();
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
          autoFocus
        />
      </form>
    </header>
  );
};
