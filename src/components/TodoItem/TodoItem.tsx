/* eslint-disable default-case */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  toDelete: (id: number) => void;
  toToggle: (id: number) => void;
  toChangeTitle: (title: string, id: number) => void;
};

export const TodoItem: React.FC<Props> = React.memo((({
  todo,
  toDelete,
  toToggle,
  toChangeTitle,
}) => {
  const { id, title, completed } = todo;
  const [editableTodoId, setEditableTodoId] = useState<number | null>(null);
  const refEditableTodoField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (refEditableTodoField.current) {
      refEditableTodoField.current.focus();
      refEditableTodoField.current.value = title;
    }
  }, [editableTodoId]);

  const handlerClickToEdit = (event: React.MouseEvent) => {
    if (event.detail === 2) {
      setEditableTodoId(id);
    }
  };

  const handlerClickToToggle = () => {
    toToggle(id);
  };

  const handlerKeyboardEditTodo = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setEditableTodoId(null);
    }

    if (event.key === 'Enter') {
      if (refEditableTodoField.current) {
        refEditableTodoField.current.blur();
      }
    }
  };

  const handlerOnBlurEditableTodoField = () => {
    if (refEditableTodoField.current) {
      const newTitle = refEditableTodoField.current.value;

      if (newTitle === title) {
        setEditableTodoId(null);

        return;
      }

      toChangeTitle(newTitle, id);
      setEditableTodoId(null);
    }
  };

  return (
    <li className={cn(
      { completed },
      { editing: editableTodoId === id },
    )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`${id}`}
          onClick={handlerClickToToggle}
        />
        <label
          onClick={handlerClickToEdit}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => toDelete(id)}
        />
      </div>
      {editableTodoId && (
        <input
          type="text"
          className="edit"
          onKeyDown={handlerKeyboardEditTodo}
          onBlur={handlerOnBlurEditableTodoField}
          ref={refEditableTodoField}
        />
      )}
    </li>
  );
}));
