import {
  FC,
  useState,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  memo,
  useRef,
  useEffect,
} from 'react';
import classnames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo,
  onDelete: (id: number) => void,
  onChangeStatus: (id: number, property: Partial<Todo>) => void
}

export const TodoItem: FC<Props> = memo((props) => {
  const {
    todo,
    onDelete,
    onChangeStatus,
  } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [changedTitle, setChangedTitle] = useState(todo.title);
  const input = useRef<HTMLInputElement | null>(null);

  const updateTodoTitle = () => {
    if (changedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!changedTitle.trim()) {
      onDelete(todo.id);
    }

    onChangeStatus(todo.id, { title: changedTitle });
    setIsEditing(false);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setChangedTitle(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTodoTitle();
  };

  const cancelEditing = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setChangedTitle(todo.title);
    }
  };

  useEffect(() => {
    if (isEditing && input.current) {
      input.current.focus();
    }
  }, [isEditing]);

  return (
    <div className={classnames('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onChange={() => {
            onChangeStatus(todo.id, { completed: !todo.completed });
          }}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={input}
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={changedTitle}
            onChange={handleChangeTitle}
            onBlur={updateTodoTitle}
            onKeyUp={cancelEditing}
          />
        </form>
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={() => onDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
});
