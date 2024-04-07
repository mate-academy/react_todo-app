import React, { useCallback, useContext } from 'react';
import { TodosContext } from '../../contexts/TodoContext';
import { Action } from '../../enums/Action';
import classNames from 'classnames';
import { isHaveNotCompletedTodo } from '../../utils/isHaveNotCompletedTodo';
import { getTodosFromLocalStorage } from '../../utils/getTodosFromLocalStorage';

export const Header: React.FC = () => {
  const {
    data: { newInputName, visibleTodos },
    dispatch,
  } = useContext(TodosContext);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch({ type: Action.addNewTodo });
    },
    [],
  );

  return (
    <header className="todoapp__header">
      {getTodosFromLocalStorage().length ? (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: !isHaveNotCompletedTodo(visibleTodos),
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: Action.toggleCompleted })}
        />
      ) : null}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newInputName}
          onChange={event =>
            dispatch({
              type: Action.updateNewTodoName,
              newInputName: event.target.value,
            })
          }
          autoFocus
        />
      </form>
    </header>
  );
};
