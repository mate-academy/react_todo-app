import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const checkForAllCompleted = () => {
    if (todos.length === 0) {
      return false;
    }

    return todos.every(todo => todo.completed);
  };

  const isAllTodosCompleted = checkForAllCompleted();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim()) {
      const newTodo: Todo = {
        id: +new Date(),
        title: title.trim(),
        completed: false,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      setTitle('');
    }
  };

  const toggleAll = () => {
    const shouldCompleteAll = !isAllTodosCompleted;

    setTodos(prevTodos =>
      prevTodos.map(todo => ({
        ...todo,
        completed: shouldCompleteAll,
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
            active: isAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
