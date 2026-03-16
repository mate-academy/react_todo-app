import React, { useContext, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import classNames from 'classnames';

export const TodoHeader: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos, addTodo, toggleAll, newTitleFieldRef } =
    useContext(TodoContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(title);
    setTitle('');
  };

  const itemsLeftCount = todos.filter(todo => !todo.completed).length;

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: itemsLeftCount === 0,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          ref={newTitleFieldRef}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onInput={event => setTitle(event.currentTarget.value)}
        />
      </form>
    </header>
  );
};
