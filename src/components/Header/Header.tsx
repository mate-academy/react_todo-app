import React, { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../types/todoContext';
import classNames from 'classnames';

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({ inputRef }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAddTask = () => {
    event?.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    setTodos(prev => [
      ...prev,
      { id: todos.length + 1, title: title.trim(), completed: false },
    ]);

    setTitle('');

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active:
              todos.length ===
              todos.filter(todo => todo.completed === true).length,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleAddTask}>
        <input
          data-cy="NewTodoField"
          type="text"
          value={title}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleTitle}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
