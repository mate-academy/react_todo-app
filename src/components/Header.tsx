import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from '../utils/TodosContext';
import { Status } from '../types/Status';
import { visiableTodos } from '../utils/getVisiableTodos';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: inputValue.trim(),
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTodo();
  };

  const toggleAll = () => {
    if (
      visiableTodos(todos, Status.completed).length === todos.length ||
      visiableTodos(todos, Status.active).length === todos.length
    ) {
      setTodos(
        todos.map(todo => ({
          ...todo,
          completed: !todo.completed,
        })),
      );
    } else {
      setTodos(
        todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      );
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active:
            visiableTodos(todos, Status.completed).length === todos.length,
        })}
        data-cy="ToggleAllButton"
        onClick={toggleAll}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={e => handleInputChange(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
