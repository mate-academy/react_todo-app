import React, { useContext, useState } from 'react';
import { ErrorMessageToShow, TodoInput } from '../types/Todo';
import { callbacks } from '../localStorage/localStorage';
import { Context } from './ContextProvider';

export const Header: React.FC = React.memo(({}) => {
  const [todoTitle, setTodoTitle] = useState<string>('');

  const { todos, setTodos, inputRef, setErrorMessage } = useContext(Context);

  function addTodo({ title, completed }: TodoInput) {
    setErrorMessage('');

    const newTodoOverlay = {
      id: +new Date(),
      title,
      completed,
    };

    setTodos([...todos, newTodoOverlay]);
    setTodoTitle('');

    return callbacks.addTodos({ id: +new Date(), title, completed });
  }

  function handleChangeAllTodosCompleted() {
    const areAllCompleted = todos.every(todo => todo.completed);
    const areAllNotCompleted = todos.every(todo => !todo.completed);

    if (areAllCompleted || areAllNotCompleted) {
      const updatedTodos = todos.map(todo => ({
        ...todo,
        completed: !todo.completed,
      }));

      setTodos(updatedTodos);
      callbacks.setTodos(updatedTodos);

      return;
    }

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: true,
    }));

    setTodos(updatedTodos);
    callbacks.setTodos(updatedTodos);
  }

  function handleSubmit(title: string) {
    if (!todoTitle.trim()) {
      setErrorMessage(ErrorMessageToShow.Title);
    }

    if (todoTitle.trim()) {
      addTodo({
        title: title.trim(),
        completed: false,
      });
    }
  }

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => {
            handleChangeAllTodosCompleted();
          }}
        />
      )}

      <form
        onSubmit={event => {
          event.preventDefault();
          handleSubmit(todoTitle);
        }}
      >
        <input
          name="newTodo"
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
});

Header.displayName = 'Header';
