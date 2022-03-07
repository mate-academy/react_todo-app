import React, { useState, useEffect, useRef } from 'react';
import './TodoForm.scss';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { useTodos } from './hooks/useTodos';

export const TodoForm: React.FC = () => {
  const [value, setValue] = useState('');
  const [areAllCompleted, setAreAllCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const content = useTodos();
  const todos = content?.todos;
  const setTodos = content?.setTodos;

  const completedTodos = todos && todos.filter(todo => todo.completed === true).length;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addTodo = () => {
    if (value && todos && setTodos) {
      setTodos([...todos, {
        id: Date.now(),
        title: value,
        completed: false,
      }]);

      setValue('');
    }
  };

  const toggleAll = () => {
    if (todos && setTodos) {
      setTodos(
        todos.map(todo => {
          return { ...todo, completed: areAllCompleted };
        }),
      );
    }
  };

  useEffect(() => {
    toggleAll();
  }, [areAllCompleted]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value.trim());
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodo();
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <form
      className="todo-form"
      onSubmit={handleSubmit}
      style={todos && todos.length > 0
        ? { marginBottom: '24px' }
        : { marginBottom: '0' }}
    >
      {todos && todos.length > 0 && (
        <>
          <button
            type="button"
            onClick={() => setAreAllCompleted(!areAllCompleted)}
            className={classNames(
              'todo-form__button', {
                'todo-form__button--left': todos.length !== completedTodos,
                'todo-form__button--left todo-form__button--left--toggled': todos.length === completedTodos,
              },
            )}
            data-tip
            data-for="toggleAllTip"
          >
            <i className="fa-solid fa-check todo-form__icon" />
          </button>
          <ReactTooltip
            id="toggleAllTip"
            place="top"
            effect="solid"
          >
            {areAllCompleted ? 'Unselect all' : 'Select all'}
          </ReactTooltip>
        </>
      )}

      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        placeholder="Type your todo here..."
        className="todo-form__input input is-success"
      />

      {value.length > 0 && (
        <button
          type="submit"
          className="todo-form__button todo-form__button--right button is-success"
        >
          <i className="fa-solid fa-plus todo-form__icon" />
        </button>
      )}
    </form>
  );
};
