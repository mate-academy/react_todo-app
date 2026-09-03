/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useRef, useEffect } from 'react';
import { TodoContext } from './Context';
import { TodoList } from './Components/TodoList';
import { TodoFooter } from './Components/TodoFooter';

export const App: React.FC = () => {
  const context = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [redact, setRedact] = useState<string>('');
  const editInputRef = useRef<HTMLInputElement>(null);
  const cancelEditing = () => {
    setEditingTodoId(null);
    setRedact('');
  };

  type Filter = 'all' | 'active' | 'completed';
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!editingTodoId) {
      return;
    }

    const timer = setTimeout(() => {
      editInputRef.current?.focus();
    }, 0);

    return () => clearTimeout(timer);
  }, [editingTodoId]);

  if (context === null) {
    return null;
  }

  const {
    todos,
    clearCompleted,
    toggleTodo,
    deleteTodo,
    toggleAll,
    addTodo,
    updateTodoTitle,
  } = context;

  const visibleTodos = {
    all: todos,
    active: todos.filter(todo => !todo.completed),
    completed: todos.filter(todo => todo.completed),
  };

  const handleSave = (id: string) => {
    const trimmedTitle = redact.trim();

    if (!trimmedTitle) {
      deleteTodo(id);
      inputRef.current?.focus();
    } else {
      updateTodoTitle(id, trimmedTitle);
    }

    setEditingTodoId(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addTodo(newTodo);
    setNewTodo('');
  };

  const handleEditSubmit = (event: React.FormEvent, id: string) => {
    event.preventDefault();
    handleSave(id);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={
                todos.every(todo => todo.completed)
                  ? 'todoapp__toggle-all active'
                  : 'todoapp__toggle-all'
              }
              onClick={toggleAll}
              data-cy="ToggleAllButton"
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              ref={inputRef}
              type="text"
              value={newTodo}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={event => {
                setNewTodo(event.target.value);
              }}
            />
          </form>
        </header>

        <TodoList
          todos={visibleTodos[filter]}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editingTodoId={editingTodoId}
          setEditingTodoId={setEditingTodoId}
          redact={redact}
          setRedact={setRedact}
          editInputRef={editInputRef}
          inputRef={inputRef}
          handleSave={handleSave}
          handleEditSubmit={handleEditSubmit}
          cancelEditing={cancelEditing}
        />

        {todos.length > 0 && (
          <TodoFooter
            todosCount={todos.length}
            completedCount={todos.filter(todo => todo.completed).length}
            filter={filter}
            setFilter={setFilter}
            clearCompleted={clearCompleted}
            inputRef={inputRef}
          />
        )}
      </div>
    </div>
  );
};
