/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from './Components/GloballProvider';
import cn from 'classnames';
import { ToDo } from './Types/ToDo';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { allTodos, inputValue, activeButton, isToggled } =
    useContext(StateContext);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTodoId]);

  const handleEdit = (todoId: number, todoName: string) => {
    setEditingTodoId(todoId);
    setEditValue(todoName);
  };

  const handleEditSubmit = (todoId: number) => {
    const trimmedValue = editValue.trim();

    if (trimmedValue) {
      dispatch({
        type: 'editTodoName',
        payload: { todoId, newTodoName: trimmedValue },
      });
    } else {
      dispatch({ type: 'onTodoDelete', payload: todoId });
    }

    setEditingTodoId(null);
    setEditValue('');
  };

  const activeTodos = allTodos.filter(todo => {
    return todo.isCompleted === false;
  });

  const completedTodos = allTodos.filter(todo => {
    return todo.isCompleted === true;
  });

  let arrayToDisplay;

  if (activeButton === 'all') {
    arrayToDisplay = allTodos;
  } else if (activeButton === 'active') {
    arrayToDisplay = activeTodos;
  } else {
    arrayToDisplay = completedTodos;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {allTodos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: allTodos.length === completedTodos.length || isToggled,
              })}
              data-cy="ToggleAllButton"
              onClick={() => dispatch({ type: 'onToggle' })}
            />
          )}

          <form
            onSubmit={event => {
              event.preventDefault();
              dispatch({ type: 'submit', payload: `${inputValue}` });
            }}
          >
            <input
              data-cy="NewTodoField"
              ref={inputRef}
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={event => {
                dispatch({
                  type: 'onInputChange',
                  payload: `${event.target.value}`,
                });
              }}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {arrayToDisplay.map((todo: ToDo) => {
            return (
              <div
                data-cy="Todo"
                className={cn('todo', {
                  completed: todo.isCompleted === true,
                })}
                key={todo.todoId}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    onChange={() => {
                      dispatch({
                        type: 'onCheckboxChange',
                        payload: +`${todo.todoId}`,
                      });
                    }}
                    checked={todo.isCompleted}
                  />
                </label>
                {editingTodoId === todo.todoId ? (
                  <form
                    onSubmit={event => {
                      event.preventDefault();
                      handleEditSubmit(todo.todoId);
                    }}
                  >
                    <input
                      ref={editInputRef}
                      data-cy="TodoTitleField"
                      type="text"
                      className="todo__title-field"
                      placeholder="Empty todo will be deleted"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={() => handleEditSubmit(todo.todoId)}
                      onKeyUp={e => {
                        if (e.key === 'Escape') {
                          setEditingTodoId(null);
                          setEditValue('');
                        }
                      }}
                    />
                  </form>
                ) : (
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => handleEdit(todo.todoId, todo.todoName)}
                  >
                    {todo.todoName}
                  </span>
                )}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => {
                    dispatch({
                      type: 'onTodoDelete',
                      payload: todo.todoId,
                    });
                  }}
                >
                  ×
                </button>
              </div>
            );
          })}
        </section>

        {allTodos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodos.length} items left`}
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={cn('filter__link', {
                  selected: activeButton === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => {
                  dispatch({ type: 'showAll' });
                }}
              >
                All
              </a>

              <a
                href="#/active"
                data-cy="FilterLinkActive"
                className={cn('filter__link', {
                  selected: activeButton === 'active',
                })}
                onClick={() => {
                  dispatch({ type: 'showFiltered', payload: 'active' });
                }}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={cn('filter__link', {
                  selected: activeButton === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => {
                  dispatch({ type: 'showFiltered', payload: 'completed' });
                }}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => {
                dispatch({ type: 'clearCompleted' });
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
