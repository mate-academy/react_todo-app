/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext, Todo } from './global/Store';
import classNames from 'classnames';

export const App: React.FC = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [title, setTitle] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [isEditedId, setIsEditedId] = useState(-1);

  const titleRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!titleRef.current?.focus) {
      return;
    }

    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!editRef.current?.focus) {
      return;
    }

    editRef.current?.focus();
  }, [isEditedId]);

  useEffect(() => {
    const todosFromStorage = JSON.parse(localStorage.getItem('todos') || '[]');

    if (todosFromStorage.length !== 0) {
      todosFromStorage.forEach((todo: Todo) => {
        dispatch({
          type: 'add',
          payload: { todo },
        });
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    dispatch({
      type: 'add',
      payload: {
        todo: {
          id: +new Date(),
          title: title.trim(),
          completed: false,
        },
      },
    });

    setTitle('');
  };

  const handleDeleteTodo = (todoId: number) => {
    titleRef.current?.focus();
    dispatch({ type: 'delete', payload: { id: todoId } });
  };

  const handleClearAll = () => {
    titleRef.current?.focus();
    todos
      .filter(todo => todo.completed)
      .forEach(fTodo =>
        dispatch({ type: 'delete', payload: { id: fTodo.id } }),
      );
  };

  const handleUpdateTodo = (
    todoId: number,
    newTitle: string,
    completed: boolean,
  ) => {
    dispatch({
      type: 'update',
      payload: {
        id: todoId,
        newData: {
          title: newTitle,
          completed,
        },
      },
    });
  };

  const handleEditTodo = (todo: Todo) => {
    if (!editedTitle.trim()) {
      handleDeleteTodo(todo.id);
    } else {
      handleUpdateTodo(todo.id, editedTitle.trim(), todo.completed);
    }

    setIsEditedId(-1);
  };

  const handleFilterTodo = (status: 'All' | 'Active' | 'Completed') => {
    dispatch({ type: 'filter', payload: { status } });
  };

  const completeAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    todos.forEach(todo =>
      dispatch({
        type: 'update',
        payload: {
          id: todo.id,
          newData: {
            ...todo,
            completed: !allCompleted,
          },
        },
      }),
    );
  };

  const completeSingleTodo = (todoId: number) => {
    const singleTodo = todos.find(todo => todo.id === todoId);

    if (singleTodo) {
      dispatch({
        type: 'update',
        payload: {
          id: singleTodo.id,
          newData: {
            ...singleTodo,
            completed: !singleTodo.completed,
          },
        },
      });
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length !== 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed),
              })}
              data-cy="ToggleAllButton"
              onClick={completeAll}
            />
          )}

          <form onSubmit={handleAddTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={titleRef}
              value={title}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={handleTitle}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              data-cy="Todo"
              key={todo.id}
              className={classNames('todo', { completed: todo.completed })}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  onClick={() => completeSingleTodo(todo.id)}
                  checked={todo.completed}
                />
              </label>

              {isEditedId !== todo.id ? (
                <>
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => {
                      setIsEditedId(todo.id);
                      setEditedTitle(todo.title);
                    }}
                  >
                    {todo.title}
                  </span>

                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    ×
                  </button>
                </>
              ) : (
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    handleEditTodo(todo);
                  }}
                >
                  <input
                    data-cy="TodoTitleField"
                    type="text"
                    ref={editRef}
                    className="todo__title-field"
                    placeholder="Empty todo will be deleted"
                    value={editedTitle}
                    onChange={event => setEditedTitle(event.target.value)}
                    onKeyUp={event => {
                      if (event.key === 'Escape') {
                        setIsEditedId(-1);
                        setEditedTitle(todo.title);
                      }
                    }}
                    onBlur={() => handleEditTodo(todo)}
                  />
                </form>
              )}
            </div>
          ))}
        </section>

        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: filter === 'All',
                })}
                data-cy="FilterLinkAll"
                onClick={() => handleFilterTodo('All')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: filter === 'Active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => handleFilterTodo('Active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: filter === 'Completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => handleFilterTodo('Completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => !todo.completed)}
              onClick={handleClearAll}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
