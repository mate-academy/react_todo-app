import React, { useCallback, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { Todo } from '../type';

type TodoHeaderProps = {};

export const TodoHeader: React.FC<TodoHeaderProps> = () => {
    const { todos, setTodos } = useContext(TodoContext);

    console.log(todos)

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
        />
      </form>
    </header>
  );
};
