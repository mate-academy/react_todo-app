import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  onChecked: (id: number) => void,
  onRemove: (id: number) => void,
  onModofiedTitile: (id: number, title: string) => void,
};

export const TodoAppCard: React.FC<Props> = ({
  todo,
  onChecked,
  onRemove,
  onModofiedTitile,
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const handleDoubleCklick = () => {
    setEditingTitle(true);
    setTodoTitle(todo.title);
  };

  const handlerInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handlerInputOnEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setEditingTitle(!editingTitle);
      onModofiedTitile(todo.id, todoTitle);
    }
  };

  const handlerInputOnBlur = () => {
    setEditingTitle(!editingTitle);
    onModofiedTitile(todo.id, todoTitle);
  };

  const handlerInputOnEscape = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setEditingTitle(!editingTitle);
      onModofiedTitile(todo.id, todo.title);
    }
  };

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  });

  return (
    <>
      <li
        className={classNames(
          {
            completed: todo.completed,
            editing: editingTitle,
          },
        )}
      >
        <div className="view">
          <input
            onChange={() => {
              onChecked(todo.id);
            }}
            type="checkbox"
            className="toggle"
            checked={todo.completed}
          />
          <label
            aria-hidden="true"
            onClick={() => {
              onChecked(todo.id);
            }}
            onDoubleClick={handleDoubleCklick}
          >
            {todo.title}
          </label>

          {/* eslint-disable-next-line */}
          <button
            onClick={() => {
              onRemove(todo.id);
            }}
            type="button"
            className="destroy"
            data-cy="deleteTodo"
          />
        </div>
        {editingTitle && (
          <input
            ref={inputField}
            type="text"
            className="edit"
            value={todoTitle}
            onChange={handlerInputOnChange}
            onKeyDown={handlerInputOnEnter}
            onBlur={handlerInputOnBlur}
            onKeyUp={handlerInputOnEscape}
          />
        )}
      </li>
    </>
  );
};
