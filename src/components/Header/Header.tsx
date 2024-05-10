import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { DispatchContext, StateContext } from '../GlobalContext/GlobalContext';
import { Action } from '../../types/Actions';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const [task, setTask] = useState('');
  const [isActive, setIsActive] = useState(true);
  const focusOnAddTodo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusOnAddTodo.current) {
      focusOnAddTodo.current.focus();
    }
  }, [todos]);

  const handleWriteTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handlePressKey = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      id: +new Date(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 1,
      title: task.trim(),
      completed: false,
    };

    if (task.trim() !== '') {
      dispatch({ type: Action.saveTodo, payload: newTodo });
      setTask('');

      localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    }
  };

  const HandleMarkingDone = () => {
    dispatch({ type: Action.updateTodo });

    setIsActive(!isActive);
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', { active: isActive })}
          data-cy="ToggleAllButton"
          onClick={HandleMarkingDone}
        />
      )}

      <form className="todoapp__form" onSubmit={handlePressKey}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={task}
          onChange={handleWriteTodo}
          ref={focusOnAddTodo}
        />
      </form>
    </header>
  );
};
