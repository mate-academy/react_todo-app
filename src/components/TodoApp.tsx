import React, { useContext, useState } from 'react';
import { TodoContext } from './TodoContext';
import classNames from 'classnames';

export const TodoApp: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { todos, setTodos } = useContext(TodoContext)!;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: new Date().getTime().toString(),
        title: inputValue,
        completed: false,
      },
    ]);

    setInputValue('');
  };

  const handleAllActive = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  return (
    <div className="todoapp__content">
      <header className="todoapp__header">
        {/* this button should have `active` class only if all todos are completed */}
        {todos.length > 0 && (
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: todos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
            onClick={() => handleAllActive()}
          />
        )}

        {/* Add a todo on form submit */}
        <form onSubmit={onSubmit}>
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            autoFocus
          />
        </form>
      </header>
    </div>
  );
};
