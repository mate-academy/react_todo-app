import React, { useContext, useRef, useEffect } from 'react';
import { TodoContext } from './TodoContext';
import classNames from 'classnames';
import { Todo } from '../type/Todo';

export const Header: React.FC = () => {
  const { newTodo, setNewTodo, todos, setTodos } = useContext(TodoContext);

  const addTodo = () => {
    if (!newTodo.trim()) {
      return;
    }

    const newId = +new Date();
    const newTodoItem: Todo = {
      id: newId,
      title: newTodo.trim(),
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    addTodo();
  };

  const completedTodo = todos.filter(todo => todo.completed);
  const allCompleted = completedTodo.length === todos.length;

  const handleCompleteAll = () => {
    if (allCompleted) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));

      return;
    }

    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    focusInput();
  }, [todos.length]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleCompleteAll}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={handleInputChanged}
          ref={inputRef}
          autoFocus
        />
      </form>
    </header>
  );
};
