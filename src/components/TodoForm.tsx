import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import classNames from 'classnames';

export const TodoForm: React.FC = () => {
  const { todos, setTodos, registerNewTodoInputRef } = useContext(TodosContext);

  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerNewTodoInputRef(inputRef);
    inputRef.current?.focus();
  }, [registerNewTodoInputRef]);

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodoTitle.trim() === '') {
      return;
    }

    const newTodo = {
      id: new Date(),
      title: newTodoTitle.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
  };

  const allCompleted = useMemo(
    () => todos.length > 0 && todos.every(t => t.completed),
    [todos],
  );

  const toggleAll = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: !allCompleted })));
  };

  useEffect(() => {
    // Handler to detect clicks outside input
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        inputRef.current.blur(); // remove focus when clicked outside
      } else {
        inputRef.current?.focus(); // focus if clicked inside
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={addTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={inputRef}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
