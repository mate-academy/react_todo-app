// eslint-disable-next-line object-curly-newline
import { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editingTodo: (id: number, title: string) => void;
};

export const TodoItem: FC<Props> = ({
  todo: { id, title, completed },
  deleteTodo,
  toggleTodo,
  editingTodo,
}) => {
  const [text, setText] = useState<string>(title);
  const [editing, setEditing] = useState<boolean>(false);
  const editingTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTodoField.current) {
      editingTodoField.current.focus();
    }
  }, [editing]);

  const completedEditingTodoHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      editingTodo(id, text);
      setEditing(false);
    }

    if (event.key === 'Escape') {
      setText(title);
      setEditing(false);
    }
  };

  const onBlurHandler = () => {
    editingTodo(id, text);
    setEditing(false);
  };

  return (
    <li
      className={classNames({ completed }, { editing })}
      onDoubleClick={() => setEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          id="toggle-view toggle-completed toggle-editing"
          onChange={() => toggleTodo(id)}
        />
        <label htmlFor="toggle-view">{title}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={() => deleteTodo(id)}
        />

      </div>
      <input
        type="text"
        className="edit"
        value={text}
        ref={editingTodoField}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => completedEditingTodoHandler(e)}
        onBlur={() => onBlurHandler()}
      />
    </li>
  );
};
