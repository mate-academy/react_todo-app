import React, { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';

export const Header = () => {
  const { setTodos } = useContext(TodoContext);
  const [task, setTask] = useState('');

  const handleWriteTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handlePressKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && task.trim() !== '') {
      setTodos(task);
      setTask('');
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={task}
          onChange={handleWriteTodo}
          onKeyDown={handlePressKey}
          autoFocus
        />
      </form>
    </header>
  );
};
