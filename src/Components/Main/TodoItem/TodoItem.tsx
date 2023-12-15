/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { TodosContext } from '../../../Context/TodosContext';
import { Todos } from '../../../Types/Todos';

type Props = {
  todo: Todos
};

const ENTER_KEY = 'Enter';

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    handleCompleted,
    handleUpdateTodo,
    handleDeleteTodo,
  } = useContext(TodosContext);

  const [isEdit, setIsEdit] = useState(false);
  const [editingText, setEditingText] = useState(todo.title);

  const inputFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [isEdit]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ENTER_KEY && editingText) {
      setIsEdit(false);
      handleUpdateTodo(todo.id, editingText);
    }

    if (event.key === ENTER_KEY && !editingText) {
      setIsEdit(false);
      handleDeleteTodo(todo.id);
    }
  };

  const handleBlur = () => {
    if (editingText) {
      setIsEdit(false);
      handleUpdateTodo(todo.id, editingText);
    }

    if (!editingText) {
      setIsEdit(false);
      handleDeleteTodo(todo.id);
    }
  };

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEdit(false);
      setEditingText(todo.title);
      handleUpdateTodo(todo.id, todo.title);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(event.target.value);
  };

  const handleLable = () => {
    setIsEdit(true);
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: isEdit,
      })}
      key={todo.id}
    >
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          id={`${todo.id}`}
          onChange={() => handleCompleted(todo.id)}
        />

        {isEdit
          ? (
            <input
              type="text"
              className="edit"
              name="editingField"
              ref={inputFocus}
              value={editingText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onKeyUp={handleOnKeyUp}
              tabIndex={0}
              onBlur={handleBlur}
            />
          )
          : (
            <label
              onDoubleClick={handleLable}
            >
              {todo.title}
            </label>
          )}

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeleteTodo(todo.id)}
        />
      </div>
    </li>
  );
};
