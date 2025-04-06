/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { TodoProvider, useTodos } from './TodoContext';
import './styles/todoapp.scss';
import './styles/todo-list.scss';

const TodoItem: React.FC<{
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
}> = ({ todo, toggleTodo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  const handleSave = () => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle) {
      updateTodo(todo.id, trimmedTitle);
    } else {
      deleteTodo(todo.id); // Delete todo if the title is empty
    }

    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditedTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`} data-cy="Todo">
      <label
        htmlFor={`todo-checkbox-${todo.id}`}
        className="todo__status-label"
      >
        <span className="sr-only">Mark as completed</span>
        <input
          id={`todo-checkbox-${todo.id}`}
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          data-cy="TodoStatus"
        />
      </label>

      {isEditing ? (
        <form>
          <label htmlFor={`editTodo-${todo.id}`} className="sr-only">
            Edit Todo
          </label>
          <input
            id={`editTodo-${todo.id}`}
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            onBlur={handleSave}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
            data-cy="TodoTitle"
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => deleteTodo(todo.id)}
            data-cy="TodoDelete"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

export const TodoApp: React.FC = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    toggleAll,
    updateTodo,
  } = useTodos();
  const [newTodo, setNewTodo] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${todos.length > 0 && todos.every(todo => todo.completed) ? 'active' : ''}`}
            onClick={toggleAll}
            data-cy="ToggleAllButton"
            title="Toggle all todos"
          >
            Toggle All
          </button>

          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'All' ? 'selected' : ''}`}
                onClick={() => setFilter('All')}
                data-cy="FilterLinkAll"
              >
                All
              </a>
              <a
                href="#/active"
                className={`filter__link ${filter === 'Active' ? 'selected' : ''}`}
                onClick={() => setFilter('Active')}
                data-cy="FilterLinkActive"
              >
                Active
              </a>
              <a
                href="#/completed"
                className={`filter__link ${filter === 'Completed' ? 'selected' : ''}`}
                onClick={() => setFilter('Completed')}
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              onClick={clearCompleted}
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => !todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};
