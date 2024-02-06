/* eslint-disable jsx-a11y/control-has-associated-label */

import React, {
  useRef, useState, useContext,
} from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const { todos, setTodos } = useContext(TodosContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const titleField = useRef<HTMLInputElement>(null);

  const handleToggleTodo = (todoId: number) => {
    const modifiedTodos = todos.map(elem => {
      if (elem.id === todoId) {
        return {
          ...elem,
          completed: !elem.completed,
        };
      }

      return elem;
    });

    setTodos(modifiedTodos);
  };

  const handleTodoDelete = (todoId: number) => {
    const filteredTodos = todos
      .filter(currentTodo => currentTodo.id !== todoId);

    setTodos(filteredTodos);
  };

  const handleEditSubmit = () => {
    if (editTitle.trim()) {
      setEditTitle(editTitle.trim());
      setIsEdit(false);

      const modifiedTodos = todos.map(elem => {
        if (elem.id === id) {
          return {
            ...elem,
            title: editTitle,
          };
        }

        return elem;
      });

      setTodos(modifiedTodos);
    } else {
      handleTodoDelete(id);
    }
  };

  const handleOnBlur = () => {
    handleEditSubmit();
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleOnBlur();
    }

    if (event.key === 'Escape') {
      setIsEdit(false);
      setEditTitle(title);
    }
  };

  const handleDoubleClick = () => {
    setIsEdit(true);

    setTimeout(() => {
      titleField.current?.focus();
    }, 1);
  };

  return (
    <li
      className={classNames({
        [TodoStatus.VIEW]: true,
        [TodoStatus.COMPLETED]: completed,
        [TodoStatus.EDITING]: isEdit,
      })}
    >
      {isEdit ? (
        <input
          type="text"
          className="edit"
          value={editTitle}
          ref={titleField}
          onChange={event => setEditTitle(event.target.value)}
          onBlur={handleOnBlur}
          onKeyUp={handleKeyUp}
        />
      ) : (
        <div className="view">
          <input
            type="checkbox"
            id={`todo-${id}`}
            ref={titleField}
            className="toggle"
            checked={completed}
            onChange={() => handleToggleTodo(id)}
          />

          <label
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => handleTodoDelete(id)}
          />
        </div>
      )}
    </li>
  );
};
