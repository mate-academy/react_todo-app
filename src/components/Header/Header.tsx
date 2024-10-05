import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TodosContext } from '../TodosContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const { todos, setTodos, addTodo } = useContext(TodosContext);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState('');
  const [buttonVisible, setButtonVisible] = useState(false);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!!title.trim().length) {
      addTodo(title.trim());
      setTitle('');
      setButtonVisible(true);
    }
  };

  const areAllTodosCompleted = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  useEffect(() => {
    setButtonVisible(todos.length > 0);
  }, [todos]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const handleToggleAll = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: areAllTodosCompleted ? false : true,
    }));

    setTodos(updatedTodos);
  };

  return (
    <header className="todoapp__header">
      {buttonVisible && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={title}
          onChange={handleChangeInput}
          style={{ outline: 'none', boxSizing: 'border-box' }}
        />
      </form>
    </header>
  );
};
