/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { TodosContext } from '../context/TodosContex';

type Props = {
  todo: Todo;
  setFocused: (value: boolean) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, setFocused }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const [onEdit, setOnEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const todoInputRef = useRef<HTMLInputElement>(null);
  const normalizedTitle = title.trim();

  useEffect(() => {
    if (onEdit && todoInputRef.current) {
      todoInputRef.current.focus();
    }
  }, [onEdit]);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOnEdit(false);
      setTitle(todo.title);
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setTitle(event.target.value);
  };

  const updateTodo = (updatedTodo: Todo) => {
    const newTodos = [...todos];

    const index = todos.findIndex(
      currentTodo => currentTodo.id === updatedTodo.id,
    );

    newTodos.splice(index, 1, updatedTodo);

    setFocused(true);
    setTodos(newTodos);
  };

  const deleteTodo = () => {
    setTodos(todos.filter(currentTodo => currentTodo.id !== todo.id));
  };

  const onDelete = () => {
    deleteTodo();
    setFocused(true);
  };

  const statusChange = () => {
    updateTodo({ ...todo, completed: !todo.completed });
  };

  const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (normalizedTitle.length === 0) {
      deleteTodo();

      return;
    }

    if (normalizedTitle === todo.title) {
      setTitle(normalizedTitle);
      setOnEdit(false);

      return;
    }

    updateTodo({ ...todo, title: title });
    setOnEdit(false);
  };

  return (
    <>
      <div
        data-cy="Todo"
        onDoubleClick={() => setOnEdit(true)}
        className={classNames('todo', { completed: todo.completed })}
      >
        <label className="todo__status-label" onClick={() => statusChange()}>
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
          />
        </label>

        {!onEdit ? (
          <>
            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              onClick={() => onDelete()}
              data-cy="TodoDelete"
            >
              ×
            </button>
          </>
        ) : (
          <form onSubmit={event => onSubmit(event)}>
            <input
              data-cy="TodoTitleField"
              ref={todoInputRef}
              value={title}
              onChange={event => {
                onInputChange(event);
              }}
              onBlur={() => onSubmit()}
              onKeyUp={event => handleKeyUp(event)}
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
            />
          </form>
        )}
      </div>
    </>
  );
};
