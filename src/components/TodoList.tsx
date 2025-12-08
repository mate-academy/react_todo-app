import React, { useContext, useState } from 'react';
import { TodoContext } from './TodoContext';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [editingValue, setEditingValue] = useState('');
  const [shownItems, setShownItems] = useState<'all' | 'active' | 'completed'>(
    'all',
  );

  const shownFilter = (todo: Todo) => {
    if (shownItems === 'active') {
      return todo.completed === false;
    } else if (shownItems === 'completed') {
      return todo.completed === true;
    } else {
      return true;
    }
  };

  const handleDeleteItem = (item: Todo) => {
    const newTodos = todos.filter(todo => todo.id !== item.id);

    setTodos(newTodos);
  };

  const handleActiveCompleted = (item: Todo) => {
    const newTodos = todos.map((todo: Todo) => {
      if (item.id === todo.id) {
        return { ...todo, completed: !item.completed };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleDoubleClick = (item: Todo) => {
    setTodos(
      todos.map(todo =>
        todo.id === item.id ? { ...todo, isEditing: true } : todo,
      ),
    );

    setEditingValue(item.title);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  const handleEditSubmit = (item: Todo) => {
    setTodos(
      todos
        .map(todo =>
          todo.id === item.id
            ? { ...todo, title: editingValue, isEditing: false }
            : todo,
        )
        .filter(todo => todo.title.trim() !== ''),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, item: Todo) => {
    if (e.key === 'Enter') {
      handleEditSubmit(item);
    }
  };

  const handleBlur = (item: Todo) => {
    handleEditSubmit(item);
  };

  const handleClearCompleted = () => {
    if (todos.some(todo => todo.completed)) {
      setTodos(todos.filter(todo => todo.completed === false));
    }
  };

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {todos
          .filter(todo => shownFilter(todo))
          .map(todo => (
            <div
              data-cy="Todo"
              className={classNames('todo', { completed: todo.completed })}
              key={todo.id}
            >
              <label
                aria-label="Toggle todo status"
                className="todo__status-label"
              >
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  onChange={() => handleActiveCompleted(todo)}
                />
              </label>

              {todo.isEditing ? (
                <input
                  placeholder="Empty todo will be deleted"
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  value={editingValue}
                  onChange={handleEditChange}
                  onKeyDown={e => handleKeyDown(e, todo)}
                  onBlur={() => handleBlur(todo)}
                  autoFocus
                />
              ) : (
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => handleDoubleClick(todo)}
                >
                  {todo.title}
                </span>
              )}

              {/* Remove button appears only on hover */}
              {todo.isEditing || (
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => handleDeleteItem(todo)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
      </section>

      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todos.reduce((acc, todo) => acc + (!todo.completed ? 1 : 0), 0)}
            items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: shownItems === 'all',
              })}
              data-cy="FilterLinkAll"
              onClick={e => {
                e.preventDefault();
                setShownItems('all');
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: shownItems === 'active',
              })}
              data-cy="FilterLinkActive"
              onClick={e => {
                e.preventDefault();
                setShownItems('active');
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: shownItems === 'completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={e => {
                e.preventDefault();
                setShownItems('completed');
              }}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() => handleClearCompleted()}
            disabled={!todos.some(todo => todo.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
