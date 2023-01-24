/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint no-param-reassign: ["error", { "props": false }] */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  item: Todo,
  setItems: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodoItem: React.FC<Props> = ({ item, setItems }) => {
  const { title, completed, id } = item;
  const [value, setValue] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const titleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInput.current) {
      titleInput.current.focus();
    }
  });

  const setId = () => `toggle-${completed ? 'completed' : 'view'}-${id}`;
  const removeItem = (itemId: number) => setItems(currentItems => currentItems
    .filter(itemTodo => itemTodo.id !== itemId));

  const upDateItem = (text: string) => setItems(currentItem => {
    item.title = text;

    return [...currentItem];
  });

  const handleChangeCheckBox = (
    itemTodo: Todo,
  ) => {
    setItems(currentItems => {
      itemTodo.completed = !completed;

      return [...currentItems];
    });
  };

  const handleClickDestroy = (todoId: number) => removeItem(todoId);

  const handleClickLabel = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => {
    e.preventDefault();
  };

  const handleClickEdit = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => {
    if (e.detail !== 2) {
      return;
    }

    setIsEditing(true);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    switch (e.key) {
      case 'Escape':
        setValue(title);
        setIsEditing(false);
        break;
      case 'Enter':
        if (e.currentTarget.value === title) {
          return;
        }

        if (!value) {
          removeItem(id);
          setIsEditing(false);

          return;
        }

        upDateItem(e.target.value);
        setIsEditing(false);
        break;
      default:
        break;
    }
  };

  const handleBlurNewTitle = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    if (e.target.value === title) {
      setIsEditing(false);

      return;
    }

    if (!value) {
      removeItem(id);
    } else {
      upDateItem(e.currentTarget.value);
    }

    setIsEditing(false);
  };

  const handleChangeTodoTitle = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setValue(e.currentTarget.value);

  return (
    <li className={classNames({ completed }, { editing: isEditing })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={setId()}
          checked={completed}
          onChange={() => handleChangeCheckBox(item)}
        />
        <label
          role="presentation"
          htmlFor={setId()}
          onClick={handleClickLabel}
          onDoubleClick={handleClickEdit}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleClickDestroy(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={value}
        ref={titleInput}
        onChange={handleChangeTodoTitle}
        onKeyDown={handleKeyDown}
        onBlur={handleBlurNewTitle}
      />
    </li>
  );
};
