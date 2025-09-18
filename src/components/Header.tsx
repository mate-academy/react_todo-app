import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const { todos, addTodo, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');

  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const handleToggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(currentTodos =>
      currentTodos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    );
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            ' active': todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form
        onSubmit={() => {
          addTodo(title);
          setTitle('');
        }}
      >
        <input
          ref={input}
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
