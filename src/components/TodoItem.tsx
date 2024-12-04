/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { DispatchContext, StateContext } from '../Store';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { renamingTodo } = React.useContext(StateContext);

  const isRenaming = renamingTodo === todo.id;

  // const [isRenaming, setIsRenaming] = useState<boolean>(false);

  const todoField = useRef<HTMLInputElement>(null);

  const dispatch = useContext(DispatchContext);

  const handleRenamingTodo = (id: number | null) => {
    if (dispatch) {
      dispatch({ type: 'renameTodo', payload: id });
    }
  };

  const handleDelete = () => {
    if (dispatch) {
      dispatch({ type: 'deleteTodo', payload: todo.id });
    }
  };

  const handleToggle = () => {
    if (dispatch) {
      dispatch({ type: 'toggleTodo', payload: todo.id });
    }
  };

  const updateTodo = () => {
    if (dispatch) {
      dispatch({
        type: 'updateTodo',
        payload: {
          ...todo,
          title: inputValue,
        },
      });
    }
  };

  const handleEditTodo = () => {
    handleRenamingTodo(todo.id);
    // setIsRenaming(true);
    setInputValue(todo.title);
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmitChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRenamingTodo(null);
    // setIsRenaming(false);
    if (inputValue === '') {
      handleDelete();

      return;
    }

    if (inputValue !== todo.title) {
      updateTodo();
      handleRenamingTodo(null);
      // setIsRenaming(false);

      return;
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleRenamingTodo(null);
        // setIsRenaming(false);

        return;
      }
    };

    window.addEventListener('keyup', handleEsc);

    return () => {
      window.removeEventListener('keyup', handleEsc);
    };
  }, []);

  useEffect(() => {
    if (todoField.current) {
      todoField.current.focus();
    }
  }, [isRenaming]);

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggle}
        />
      </label>

      {!isRenaming && (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleEditTodo}
        >
          {todo.title}
        </span>
      )}

      {!!isRenaming && (
        <form onSubmit={handleSubmitChange} onBlur={handleSubmitChange}>
          <input
            ref={todoField}
            className="todo__title-field"
            type="text"
            value={inputValue}
            onChange={handleChangeValue}
          />
        </form>
      )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDelete}
      >
        ×
      </button>
    </div>
  );
};

export default TodoItem;
