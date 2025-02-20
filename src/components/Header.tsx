import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

export const Header: React.FC = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todoToAdd: Todo = {
      id: +new Date(),
      title: newTodo,
      completed: false,
    };

    dispatch({ type: 'ADD_TODO', payload: todoToAdd });
    setNewTodo('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: state.todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => setNewTodo(event.target.value)}
        />
      </form>
    </header>
  );
};
