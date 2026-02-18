/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useTodosContext } from './TodosContext';
import cn from 'classnames';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const { todos, setTodos } = useTodosContext();
  const [title, setTitle] = useState('');
  const [type, setType] = useState<Filter>('All');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState(''); // хранит текущее значение редактирования

  const newTodoRef = useRef<HTMLInputElement>(null);
  const editTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId !== null) {
      editTodoRef.current?.focus();
    } else {
      newTodoRef.current?.focus();
    }
  }, [editingId, todos.length]);

  const handleCreateTodo = (titleValue: string) => {
    const trimmedTitleValue = titleValue.trim();

    if (!trimmedTitleValue) {
      return;
    }

    setTodos(prev => [
      ...prev,
      {
        id: +new Date(),
        title: trimmedTitleValue,
        completed: false,
      },
    ]);
    setTitle('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateTodo(title);
  };

  const visibleTodos = todos.filter(todo => {
    switch (type) {
      case 'Active':
        return !todo.completed;
      case 'Completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const notCompletedTodos = todos.filter(t => !t.completed).length;
  const completedTodos = todos.filter(t => t.completed).length;
  const allCompleted = todos.every(t => t.completed);

  const toggleAll = () => {
    setTodos(prev => prev.map(t => ({ ...t, completed: !allCompleted })));
  };

  const handleSave = (id: number) => {
    const trimmed = editValue.trim();

    if (!trimmed) {
      setTodos(prev => prev.filter(t => t.id !== id));
    } else {
      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, title: trimmed } : t)),
      );
    }

    setEditingId(null);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', { active: allCompleted })}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              ref={newTodoRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo is-danger"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <div data-cy="TodoList">
            {visibleTodos.map(todo => {
              const isEditing = editingId === todo.id;

              return (
                <div
                  data-cy="Todo"
                  className={cn('todo', { completed: todo.completed })}
                  key={todo.id}
                >
                  <label className="todo__status-label">
                    <input
                      data-cy="TodoStatus"
                      type="checkbox"
                      className="todo__status"
                      checked={todo.completed}
                      onChange={() =>
                        setTodos(prev =>
                          prev.map(t =>
                            t.id === todo.id
                              ? { ...t, completed: !t.completed }
                              : t,
                          ),
                        )
                      }
                    />
                  </label>

                  {!isEditing ? (
                    <>
                      <span
                        data-cy="TodoTitle"
                        className="todo__title"
                        onDoubleClick={() => {
                          setEditingId(todo.id);
                          setEditValue(todo.title);
                        }}
                      >
                        {todo.title}
                      </span>

                      <button
                        type="button"
                        className="todo__remove"
                        data-cy="TodoDelete"
                        onClick={() =>
                          setTodos(prev => prev.filter(t => t.id !== todo.id))
                        }
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <input
                      ref={editTodoRef}
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={() => handleSave(todo.id)}
                      onKeyUp={e => {
                        if (e.key === 'Enter') {
                          handleSave(todo.id);
                        }

                        if (e.key === 'Escape') {
                          setEditingId(null);
                        }
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {notCompletedTodos} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', { selected: type === 'All' })}
                onClick={() => setType('All')}
                data-cy="FilterLinkAll"
              >
                All
              </a>
              <a
                href="#/active"
                className={cn('filter__link', { selected: type === 'Active' })}
                onClick={() => setType('Active')}
                data-cy="FilterLinkActive"
              >
                Active
              </a>
              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: type === 'Completed',
                })}
                onClick={() => setType('Completed')}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodos === 0}
              onClick={() => setTodos(prev => prev.filter(t => !t.completed))}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
