import React, { useContext } from 'react';
import { TodoContext, TodosContext } from '../../contexts/TodoContext';
import { initialTodo } from '../../utils/initialTodo';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const { todoToAdd, setTodoToAdd } = useContext(TodoContext);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form
        onSubmit={event => {
          event.preventDefault();
          setTodos([...todos, todoToAdd]);
          setTodoToAdd({ ...initialTodo, id: Number(new Date()) });
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoToAdd.name}
          onChange={event =>
            setTodoToAdd({
              ...todoToAdd,
              name: event.target.value,
            })
          }
        />
      </form>
    </header>
  );
};
