import React, { FormEventHandler, useContext, useEffect, useRef } from 'react';
import '../styles/todoapp.scss';
import { CreatedContext } from './ToDoContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const { todos, setTodos, toDoTitle, setToDoTitle } =
    useContext(CreatedContext);
  const handleInputSubmit: FormEventHandler = event => {
    event.preventDefault();
    const newTodo = {
      id: Date.now(),
      title: toDoTitle.trim(),
      completed: false,
    };

    if (!toDoTitle.trim()) {
      return;
    }

    setTodos([...todos, newTodo]);
    setToDoTitle('');
  };

  const allTodosCompleted = todos.filter(todo => todo.completed);
  const completedTodosLength = todos.length === allTodosCompleted.length;

  const handleToggle = () => {
    if (completedTodosLength) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));

      return;
    }

    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const focusOnIput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    focusOnIput();
  }, [todos.length]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: completedTodosLength,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggle}
        />
      )}

      <form onSubmit={handleInputSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={toDoTitle}
          onChange={e => setToDoTitle(e.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
