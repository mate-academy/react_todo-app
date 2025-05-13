import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { useTodos } from '../context/TodoContext';

type Props = {
  areAllCompleted: boolean;
};

export const Header: React.FC<Props> = ({ areAllCompleted }) => {
  const { todos, setTodos } = useTodos();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, [todos]);

  const handleAddTodo = (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: inputValue.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputValue('');
  };

  const toggleAllTodos = () => {
    if (areAllCompleted) {
      setTodos(currentTodos =>
        currentTodos.map(currentTodo => ({ ...currentTodo, completed: false })),
      );
    } else {
      setTodos(current =>
        current.map(currentTodo => ({ ...currentTodo, completed: true })),
      );
    }
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodos}
        />
      )}

      <form onSubmit={handleAddTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
