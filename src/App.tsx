/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useRef } from 'react';
import { TodosContext } from './TodosContext';

export const App: React.FC = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('App must be used within a TodosProvider');
  }

  const { todos, setTodos } = context;
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTodo, setEditTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const newTodoField = useRef<HTMLInputElement>(null);

  const visibleTodos = todos.filter(element => {
    if (filter === 'active') {
      return element.completed === false;
    } else if (filter === 'completed') {
      return element.completed === true;
    } else {
      return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
          <button
            type="button"
            className={
              'todoapp__toggle-all' +
              (todos.length > 0 && todos.every(todo => todo.completed === true)
                ? ' active'
                : '')
            }
            data-cy="ToggleAllButton"
            onClick={() => {
              if (
                todos.length > 0 &&
                todos.every(todo => todo.completed === true)
              ) {
                setTodos(
                  todos.map(todo => {
                    return {
                      ...todo,
                      completed: false,
                    };
                  }),
                );
              } else {
                setTodos(
                  todos.map(todo => {
                    return {
                      ...todo,
                      completed: true,
                    };
                  }),
                );
              }
            }}
          />
          )}

          {/* Add a todo on form submit */}
          <form
            onSubmit={event => {
              event.preventDefault();
              if (newTodo.trim() === '') {
                return;
              }

              setTodos([
                ...todos,
                {
                  id: +new Date(),
                  title: newTodo.trim(),
                  completed: false,
                },
              ]);
              setNewTodo('');
            }}
          >
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              autoFocus
              ref={newTodoField}
              onChange={event => {
                setNewTodo(event.target.value);
              }}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => {
            return (
              <div
                data-cy="Todo"
                className={
                  'todo' + (todo.completed === true ? ' completed' : '')
                }
                key={todo.id}
              >
                 <div className="todo__status-label">
                      <input
                        data-cy="TodoStatus"
                        type="checkbox"
                        checked={todo.completed}
                        className="todo__status"
                        onChange={() => {
                          setTodos(
                            todos.map(element => {
                              if (todo.id === element.id) {
                                return {
                                  ...element,
                                  completed: !element.completed,
                                };
                              } else {
                                return element;
                              }
                            }),
                          );
                        }}
                      />
                    </div>
                    
                {todo.id === editTodoId ? (
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    className="todo__title-field"
                    autoFocus
                    value={editTodo}
                    onBlur={() => {
                      if (editTodo.trim() === '') {
                        setTodos(
                          todos.filter(item => {
                            return item.id !== editTodoId;
                          }),
                        );
                        setEditTodoId(null);
                      } else {
                        setTodos(
                          todos.map(currentTodo => {
                            if (currentTodo.id === editTodoId) {
                              return {
                                ...currentTodo,
                                title: editTodo.trim(),
                              };
                            } else {
                              return currentTodo;
                            }
                          }),
                        );

                        setEditTodoId(null);
                      }
                    }}
                    onChange={event => setEditTodo(event.target.value)}
                    onKeyUp={event => {
                      if (event.key === 'Enter') {
                        if (editTodo.trim() === '') {
                          setTodos(
                            todos.filter(item => {
                              return item.id !== editTodoId;
                            }),
                          );
                          setEditTodoId(null);
                        } else {
                          setTodos(
                            todos.map(item => {
                              if (item.id === editTodoId) {
                                return {
                                  ...item,
                                  title: editTodo.trim(),
                                };
                              } else {
                                return item;
                              }
                            }),
                          );

                          setEditTodoId(null);
                        }
                      } else if (event.key === 'Escape') {
                        setEditTodo(todo.title);
                        setEditTodoId(null);
                      }
                    }}
                  />
                ) : (
                  <>

                    <span
                      data-cy="TodoTitle"
                      className="todo__title"
                      onDoubleClick={() => {
                        setEditTodoId(todo.id);
                        setEditTodo(todo.title);
                      }}
                    >
                      {todo.title}
                    </span>

                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                      onClick={() => {
                        setTodos(
                          todos.filter(element => todo.id !== element.id),
                        );
                        newTodoField.current?.focus();
                      }}
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </section>

        {todos.length > 0 && (
        <footer
        className="todoapp__footer"
        data-cy="Footer"
        >
          <span className="todo-count" data-cy="TodosCounter">
            {
              todos.filter(element => {
                return !element.completed;
              }).length
            }{' '}
            items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
              data-cy="FilterLinkAll"
              onClick={() => {
                setFilter('all');
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
              data-cy="FilterLinkActive"
              onClick={() => {
                setFilter('active');
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
              data-cy="FilterLinkCompleted"
              onClick={() => {
                setFilter('completed');
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
            onClick={() => {
              setTodos(
                todos.filter(element => {
                  return !element.completed;
                }),
              );
                newTodoField.current?.focus();
            }}
            disabled={
              todos.filter(element => {
                return element.completed;
              }).length === 0
            }
          >
            Clear completed
          </button>
        </footer>
        )}
      </div>
    </div>
  );
};
