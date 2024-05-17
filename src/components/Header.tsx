import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const { todos, title, setTitle, addTodo, titleRef, toggleAll } =
    useContext(TodoContext);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={addTodo}>
        <input
          ref={titleRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
