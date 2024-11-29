import React, { useState } from 'react';
import { useTodos } from '../../context/context';
import classNames from 'classnames';

const Header: React.FC = () => {
  const { todos, addTodo, mainRef, toggleAllTodos } = useTodos();
  const [title, setTitle] = useState('');
  const addNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim()) {
      addTodo(title.trim());
      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodos}
        />
      )}

      <form onSubmit={addNewTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          ref={mainRef}
        />
      </form>
    </header>
  );
};

export default Header;
