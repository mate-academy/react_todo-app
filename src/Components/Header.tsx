import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TodosContext } from './TodosContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const [value, setValue] = useState('');

  const formField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formField.current) {
      formField.current.focus();
    }
  }, [todos]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!!value.trim().length) {
      setTodos([
        ...todos,
        {
          id: +new Date(),
          title: value.trim(),
          completed: false,
        },
      ]);

      setValue('');
    }
  };

  const isEveryTodoCompleted = useMemo(
    () => todos.every(todo => todo.completed),
    [todos],
  );

  const handleChangeCompleted = () => {
    const changedTodos = [...todos].map(todo => ({
      ...todo,
      completed: isEveryTodoCompleted ? false : true,
    }));

    setTodos(changedTodos);
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isEveryTodoCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleChangeCompleted}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={formField}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
    </header>
  );
};
