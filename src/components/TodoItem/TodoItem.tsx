import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onDelete?: (id:number) => void;
  onComplete: (selectedTodo: Todo) => void;
  updateTodo?: (todo: Todo, newtitle: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete = () => {},
  onComplete = () => {},
  updateTodo = () => {},
}) => {
  const { id, title, completed } = todo;

  const [editable, setEditable] = useState(false);

  const [editedTitle, setEditedTitle] = useState(title);

  const editField = useRef<HTMLInputElement>(null);

  const handleDoubleClick = useCallback(() => {
    setEditable(true);
  }, []);

  useEffect(() => {
    if (editField.current) {
      editField.current.focus();
    }
  }, [editable]);

  const handlerKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateTodo(todo, editedTitle);
      setEditable(false);
    }

    if (event.key === 'Escape') {
      setEditable(false);
    }
  };

  const updateTodoOnBlur
  = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.preventDefault();
    updateTodo(todo, editedTitle);
    setEditable(false);
  };

  return (
    <li className={cn({
      completed,
      editing: editable,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={() => onComplete(todo)}
        />
        <label
          // htmlFor="toggle-view"
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDelete(id)}
          aria-label="delete"
        />
      </div>
      {editable && (
        <input
          data-cy="TodoTitleField"
          ref={editField}
          type="text"
          className="edit"
          value={editedTitle}
          onKeyUp={handlerKey}
          onChange={(event) => setEditedTitle(event.target.value)}
          onBlur={updateTodoOnBlur}
        />
      )}
    </li>
  );
};
