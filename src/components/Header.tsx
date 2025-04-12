import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

export const Header: React.FC = () => {
  const { state, dispatch, inputRef } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim() === '') {
      setNewTodo('');

      return;
    }

    let nextTodoId = 1;

    function generateTodoId(): number {
      return nextTodoId++;
    }

    const todoToAdd: Todo = {
      id: generateTodoId(),
      title: newTodo.trim(),
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: todoToAdd });
    setNewTodo('');
  };

  const toggleAll = () => {
    const allIds = state.todos.map(todo => todo.id);
    const activeIds = state.todos
      .filter(todo => !todo.completed)
      .map(todo => todo.id);

    if (
      state.todos.every(todo => todo.completed) ||
      state.todos.every(todo => !todo.completed)
    ) {
      dispatch({ type: 'toggleAllTodos', payload: allIds });
    } else {
      dispatch({ type: 'toggleAllTodos', payload: activeIds });
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {state.todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active:
              state.todos.length > 0 &&
              state.todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={event => setNewTodo(event.target.value)}
          autoFocus
          ref={inputRef}
        />
      </form>
    </header>
  );
};
