import React, { useContext } from 'react';
import classNames from 'classnames';
import { USER_ID } from '../api/todos';
import { TodoContext } from '../TodoContext';

export const Header: React.FC = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext must be used within a TodoProvider');
  }

  const {
    todos,
    title,
    setTitle,
    setTodos,
    setErrorMessage,
    setTempTodo,
    setProcessingIds,
    setIsAdding,
    isAdding,
    inputRef,
    focusInput,
    handleToggleAll,
    isLoading,
  } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setErrorMessage('Title should not be empty');

      return;
    }

    const createdTodo = {
      id: +new Date(),
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    };

    setTempTodo({ ...createdTodo });

    setIsAdding(true);

    try {
      setProcessingIds(prev => [...prev, createdTodo.id]);
      setTodos(currentTodos => [...currentTodos, createdTodo]);
      setTitle('');
      setProcessingIds(prev => prev.filter(id => id !== createdTodo.id));
    } catch {
      setErrorMessage('Unable to add a todo');
      focusInput();
    } finally {
      setTempTodo(null);
      setIsAdding(false);
      focusInput();
    }
  };

  return (
    <div className="todoapp__header">
      {!isLoading && todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.length > 0 && todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            handleToggleAll();
            focusInput();
          }}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          disabled={isAdding}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </div>
  );
};
