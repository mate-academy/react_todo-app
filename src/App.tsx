/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from './Components/GloballProvider';
import cn from 'classnames';
import { ToDo } from './Types/ToDo';
import { chooseActiveArray } from './utils/functions';
import { ToDoElem } from './Components/ToDoElem';
import { Footer } from './Components/Footer';

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { allTodos, inputValue, activeButton } = useContext(StateContext);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

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

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'submit', payload: `${inputValue}` });
  };

  const handleToggle = (arrayAll: ToDo[], arrayOfCompleted: ToDo[]) => {
    if (arrayAll.length !== arrayOfCompleted.length) {
      dispatch({ type: 'onToggle', payload: true });
    } else {
      dispatch({ type: 'onToggle', payload: false });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'onInputChange',
      payload: `${event.target.value}`,
    });
  };

  const activeTodos = allTodos.filter(todo => {
    return todo.completed === false;
  });

  const completedTodos = allTodos.filter(todo => {
    return todo.completed === true;
  });

  const arrayToDisplay = chooseActiveArray(
    activeButton,
    allTodos,
    completedTodos,
    activeTodos,
  );

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {allTodos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: allTodos.length === completedTodos.length,
              })}
              data-cy="ToggleAllButton"
              onClick={() => handleToggle(allTodos, completedTodos)}
            />
          )}

          <form onSubmit={handleOnSubmit}>
            <input
              data-cy="NewTodoField"
              ref={inputRef}
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={handleInputChange}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {arrayToDisplay.map((todo: ToDo) => {
            return (
              <ToDoElem
                key={todo.id}
                todo={todo}
                inputRef={inputRef}
                editInputRef={editInputRef}
                setEditingTodoId={setEditingTodoId}
                editingTodoId={editingTodoId}
              />
            );
          })}
        </section>

        {allTodos.length > 0 && (
          <Footer
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            inputRef={inputRef}
          />
        )}
      </div>
    </div>
  );
};
