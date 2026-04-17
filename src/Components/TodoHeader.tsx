import React, { useState } from 'react';
import { useTodos } from '../Context/TodoContext';
import { Todo } from '../Types/Todo';
import classNames from 'classnames';

export const TodoHeader: React.FC = () => {
  const [title, setTitle] = useState('');
  const {
    todos,
    addTodo,
    headerInputRef,
    isAllTodosCompleted,
    toggleAllTodos,
  } = useTodos();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleTrim = title.trim();

    if (titleTrim.length === 0) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: titleTrim,
      completed: false,
    };

    if (addTodo) {
      addTodo(newTodo);
    }

    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllTodosCompleted,
          })}
          onClick={() => toggleAllTodos()}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={headerInputRef}
          data-cy="NewTodoField"
          type="text"
          value={title}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
