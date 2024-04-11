/* eslint-disable no-param-reassign */
import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  isEditing: boolean;
};

type Filter = 'All' | 'Completed' | 'Active';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState('');

  const createTodo = useCallback((title: string) => {
    return {
      id: Math.round(Math.random() * 1000) / 1000,
      title,
      isEditing: false,
    } as Todo;
  }, []);

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.trim()) {
      setTodos([...todos, createTodo(inputValue)]);
      setInputValue('');
    }
  };

  const editHandler = (event: React.FormEvent, todo: Todo) => {
    event.preventDefault();

    if (!editedValue.trim()) {
      setTodos(todos.filter(currentTodo => currentTodo.id !== todo.id));
    } else {
      todo.title = editedValue;
      todo.isEditing = false;
    }

    setIsEditing(false);
    setEditedValue('');
  };

  const visibleTodos: Todo[] = useMemo(() => {
    if (filter !== 'All') {
      if (filter === 'Active') {
        return [...todos.filter(todo => !completedTodos.includes(todo))];
      } else {
        return [...completedTodos];
      }
    } else {
      return [...todos];
    }
  }, [todos, filter, completedTodos, isEditing]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: !isVisible,
              })}
              data-cy="ToggleAllButton"
              onClick={() => setIsVisible(!isVisible)}
            />
          )}

          <form onSubmit={formSubmitHandler}>
            <input
              data-cy="NewTodoField"
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {isVisible && (
          <section className="todoapp__main" data-cy="TodoList">
            {visibleTodos.map(todo => (
              <div
                key={todo.id}
                data-cy="Todo"
                className={classNames('todo', {
                  completed: completedTodos.includes(todo),
                })}
              >
                {todo.isEditing ? (
                  <form
                    style={{ gridColumn: '1 / 3' }}
                    onSubmit={event => editHandler(event, todo)}
                  >
                    <input
                      onBlur={() => {
                        todo.isEditing = false;
                        setEditedValue('');
                        setIsEditing(false);
                      }}
                      onChange={event => setEditedValue(event.target.value)}
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      autoFocus
                      value={editedValue}
                    />
                  </form>
                ) : (
                  <>
                    <label
                      onClick={() => {
                        if (!completedTodos.includes(todo)) {
                          setCompletedTodos([...completedTodos, todo]);
                        }
                      }}
                      htmlFor="#form-input"
                      className="todo__status-label"
                    >
                      <input
                        id="form-input"
                        data-cy="TodoStatus"
                        type="checkbox"
                        className="todo__status"
                        checked={completedTodos.includes(todo)}
                      />
                    </label>
                    <span
                      onDoubleClick={() => {
                        todo.isEditing = true;
                        setIsEditing(true);
                      }}
                      data-cy="TodoTitle"
                      className="todo__title"
                    >
                      {todo.title}
                    </span>
                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                      onClick={() => {
                        setTodos(
                          todos.filter(
                            currentTodo => currentTodo.id !== todo.id,
                          ),
                        );
                        setCompletedTodos(
                          completedTodos.filter(
                            currentTodo => currentTodo.id !== todo.id,
                          ),
                        );
                      }}
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            ))}
          </section>
        )}

        {todos.length > 0 && isVisible && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.length - completedTodos.length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === 'All',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === 'Active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('Completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className={classNames('todoapp__clear-completed', {
                hidden: completedTodos.length <= 0,
              })}
              data-cy="ClearCompletedButton"
              onClick={() => {
                setTodos(todos.filter(todo => !completedTodos.includes(todo)));
                setCompletedTodos([]);
              }}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
