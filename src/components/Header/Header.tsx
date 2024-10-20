import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Error } from '../../types/Error';
import { useTodoContext } from '../context/TodoContext';

type Props = {
  completedTodos: Todo[];
  textField: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({ completedTodos, textField }) => {
  const { state, dispatch } = useTodoContext();
  const { todos, query, isLoading } = state;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query.trim()) {
      dispatch({ type: 'SET_ERROR', payload: Error.titleShouldNotBeEmpty });
      setTimeout(() => {
        dispatch({ type: 'SET_ERROR', payload: null });
      }, 3000);

      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: query.trim(),
      completed: false,
    };

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_TEMP_TODO', payload: newTodo });

    try {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      dispatch({ type: 'SET_QUERY', payload: '' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: Error.unableToAdd });
      setTimeout(() => {
        dispatch({ type: 'SET_ERROR', payload: null });
      }, 3000);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_TEMP_TODO', payload: null });
    }
  };

  const handleToggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    dispatch({ type: 'TOGGLE_ALL', payload: !areAllCompleted });
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.length === completedTodos.length,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={textField}
          value={query}
          onChange={e =>
            dispatch({
              type: 'SET_QUERY',
              payload: e.target.value,
            })
          }
          disabled={isLoading}
        />
      </form>
    </header>
  );
};
