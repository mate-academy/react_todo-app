import { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { addNewTodo, updateTodo, USER_ID } from '../api/todos';
import classNames from 'classnames';
import { useGlobalDispatch, useGlobalState } from '../hooks/useGlobal';

export const TodoInput: React.FC = () => {
  // #region TodoInput states
  const [query, setQuery] = useState('');
  const { todos, visibleTodos } = useGlobalState();
  const dispatch = useGlobalDispatch();
  // #endregion
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const addTodo = async (newTodo: Todo) => {
    try {
      const todo = await addNewTodo(newTodo);

      const updatedTodos = [...todos, { ...todo }];

      dispatch({ type: 'setVisibleTodos', payload: updatedTodos });
      dispatch({ type: 'setTodos', payload: updatedTodos });
    } catch {
      dispatch({ type: 'setAddError', payload: false });
      setTimeout(() => dispatch({ type: 'setAddError', payload: true }), 0);
      throw new Error();
    }
  };

  const setInputDisabled = (value: boolean) => {
    if (inputRef.current) {
      inputRef.current.disabled = value;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      dispatch({ type: 'setTitleError', payload: false });
      setTimeout(() => dispatch({ type: 'setTitleError', payload: true }), 0);

      return;
    }

    const plannedTodo = {
      id: 0,
      userId: USER_ID,
      title: query.trim(),
      completed: false,
    };

    try {
      dispatch({ type: 'setTempTodo', payload: plannedTodo });
      setInputDisabled(true);
      dispatch({ type: 'setNotificationIsHide', payload: true });

      await addTodo(plannedTodo);

      dispatch({ type: 'setTempTodo', payload: null });
      setQuery('');
    } catch {
      dispatch({ type: 'setTempTodo', payload: null });
      throw new Error();
    } finally {
      setInputDisabled(false);
      inputRef.current?.focus();
    }
  };

  const changeInfo = async () => {
    const allCompleted = todos.every(todo => todo.completed);
    const newStatus = !allCompleted;

    const results = await Promise.allSettled(
      todos
        .filter(todo => todo.completed !== newStatus)
        .map(todo =>
          updateTodo(todo.id, {
            title: todo.title,
            completed: newStatus,
          }),
        ),
    );

    const hasUpdateError = results.some(result => result.status === 'rejected');

    if (hasUpdateError) {
      dispatch({ type: 'setUpdateError', payload: false });
      setTimeout(() => {
        dispatch({ type: 'setUpdateError', payload: true });
      }, 0);
    }

    dispatch({ type: 'checkAllTodos', payload: newStatus });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: visibleTodos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            changeInfo();
          }}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={query}
          onChange={ev => setQuery(ev.target.value)}
        />
      </form>
    </header>
  );
};
