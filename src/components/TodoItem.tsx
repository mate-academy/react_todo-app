import { RefObject, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { useGlobalDispatch, useGlobalState } from '../context/store';
import classNames from 'classnames';
import React from 'react';

type Props = {
  todo: Todo;
  inputElement: RefObject<HTMLInputElement>;
};

export const TodoItem: React.FC<Props> = ({ todo, inputElement }) => {
  const { todos } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const { id: todoId, title, completed } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const editForm = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos.filter(item => item.id !== id);

    dispatch({ type: 'setTodos', payload: filteredTodos });
    inputElement.current?.focus();
  };

  const handleOnChangeTodo = (id: number, data: boolean | string) => {
    const updateData: Partial<Todo> = {};

    if (typeof data === 'boolean') {
      updateData.completed = data;
    }

    if (typeof data === 'string') {
      updateData.title = data.trim();
    }

    const updatedTodos = todos.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ...updateData,
        };
      }

      return item;
    });

    dispatch({ type: 'setTodos', payload: updatedTodos });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    inputElement.current?.focus();
  };

  const handleCompletedStatus = () => {
    handleOnChangeTodo(todoId, !completed);
  };

  const handleTitleChange = () => {
    if (!inputValue) {
      handleDeleteTodo(todoId);

      return;
    }

    if (inputValue === title) {
      setIsEditing(false);

      inputElement.current?.focus();
    }

    if (inputValue !== title) {
      handleOnChangeTodo(todoId, inputValue);

      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      editForm.current?.focus();
    }
  }, [isEditing]);

  //#endregion

  return (
    <>
      <div data-cy="Todo" className={classNames('todo', { completed })}>
        <label className="todo__status-label">
          <input
            aria-label={`Mark ${title} as ${completed ? 'incomplete' : 'complete'}`}
            data-cy="TodoStatus"
            checked={completed}
            onChange={handleCompletedStatus}
            type="checkbox"
            className="todo__status"
          />
        </label>

        {isEditing ? (
          <form
            onSubmit={event => {
              event.preventDefault();
              handleTitleChange();
            }}
          >
            <input
              data-cy="TodoTitleField"
              type="text"
              placeholder="Empty todo will be deleted"
              value={inputValue}
              ref={editForm}
              onChange={handleInputChange}
              onBlur={handleTitleChange}
              onKeyDown={handleKeyDown}
              className="todo__title-field"
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              onDoubleClick={() => setIsEditing(true)}
              className="todo__title"
            >
              {title}
            </span>

            <button
              type="button"
              data-cy="TodoDelete"
              className="todo__remove"
              onClick={() => handleDeleteTodo(todoId)}
            >
              ×
            </button>
          </>
        )}
      </div>
    </>
  );
};
