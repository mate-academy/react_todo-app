import React, { useContext, useEffect, useRef } from 'react';
import { TodosContext } from '../../context/TodosContext';
import classNames from 'classnames';

export const Header = () => {
  const { todos, setTodos, title, setTitle } = useContext(TodosContext);

  const handleInputSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    if (!title.trim()) {
      return;
    }

    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const lengthOfCompletedTodos = todos.length === completedTodos.length;

  const handleClick = () => {
    if (lengthOfCompletedTodos) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));

      return;
    }

    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  };

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={handleClick}
        />
      )}

      <form onSubmit={handleInputSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={titleRef}
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
