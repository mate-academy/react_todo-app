import React, { useContext, useEffect, useRef, useState } from "react";
import { DispatchContext, StateContext } from "../../context/GlobalContext/GlobalContext";
import classNames from "classnames";

export const TodoAdd: React.FC = () => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const focusNewTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusNewTodoField.current) {
      focusNewTodoField.current.focus();
    }

    const completedTodo = todos.filter(todo => todo.completed);

    if (completedTodo.length === todos.length) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [todos]);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim() !== '') {
      const newTodo = {
        id: +new Date(),
        title: value.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false,
        userId: 1,
      };

      dispatch({ type: 'add', payload: newTodo });
      setValue('');

      localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    }
  }

  const handleCompleteTodos = () => {
    if (!isActive) {
      dispatch({ type: 'checkAll' });
    } else {
      dispatch({ type: 'uncheckAll' });
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', { active: isActive })}
          data-cy="ToggleAllButton"
          onClick={() => handleCompleteTodos()}
        />
      )}

      <form onSubmit={e => handleAddTodo(e)}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={e => setValue(e.target.value)}
          ref={focusNewTodoField}
        />
      </form>
    </header>
  );
}
