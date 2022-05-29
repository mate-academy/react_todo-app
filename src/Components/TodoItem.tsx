import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  todo: Todo,
  index: number,
  destroyHandler: (index: number) => void,
  toggleClass: (index: number) => void,
  changeTodo: (todoValue: string, index: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  index,
  destroyHandler,
  toggleClass,
  changeTodo,
}) => {
  const [editedTodoIndex, setEditedTodoIndex] = useState(-1);
  const [editedValue, setEditedValue] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const editStartHandler = (index: React.SetStateAction<number>) => {
    setEditedTodoIndex(index);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: editedTodoIndex === index,
      })}
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      data-cy="toggleAll"
    >
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          onChange={() => {
            toggleClass(index);
          }}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={() => {
            editStartHandler(index);
            setEditedValue(todo.title);
          }}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete todo"
          onClick={() => {
            destroyHandler(index);
          }}
        />
      </div>
      <input
        ref={input => input && input.focus()}
        type="text"
        id="editTodo"
        value={editedValue}
        className="edit"
        onChange={(e) => {
          setEditedValue(e.target.value);
        }}
        onBlur={(e) => {
          const target = e.target as HTMLInputElement;

          if (editedTodoIndex === -1) {
            return;
          }

          if (
            target.value.length !== 0
            && target.value.trim() !== ''
          ) {
            editStartHandler(-1);
            changeTodo(editedValue, index);
          } else {
            editStartHandler(-1);
            destroyHandler(index);
          }
        }}
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement;

          if (e.key === 'Enter') {
            if (
              target.value.length !== 0
              && target.value.trim() !== ''
            ) {
              editStartHandler(-1);
              changeTodo(editedValue, index);
            } else {
              editStartHandler(-1);
              destroyHandler(index);
            }
          }

          if (e.type === 'keydown' && e.key === 'Escape') {
            editStartHandler(-1);
          }
        }}
      />
    </li>
  );
};

export default TodoItem;
