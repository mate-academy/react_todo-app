import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  FormEvent,
} from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { TodoContext } from './TodoContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({
  todo: { id, title, completed },
}) => {
  const { todos, setTodos } = useContext(TodoContext);
  const [status, setStatus] = useState(completed);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setStatus(completed);
  }, [completed]);

  const deleteTodo = () => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const toggle = () => {
    setStatus(!status);
    setTodos(
      todos.map(t => {
        if (t.id === id) {
          return { id, title, completed: !status };
        }

        return t;
      }),
    );
  };

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [isEditing]);

  const submitEditing = (e: FormEvent<HTMLFormElement | HTMLInputElement>) => {
    e.preventDefault();
    setIsEditing(false);

    const trimmedTitle = value.trim();

    setValue(trimmedTitle);

    if (!trimmedTitle) {
      setTodos(todos.filter(t => t.id !== id));

      return;
    }

    setTodos(
      todos.map(t => {
        if (t.id === id) {
          return { ...t, title: trimmedTitle };
        }

        return t;
      }),
    );
  };

  const onEscape: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setValue(title);
    }
  };

  return (
    <div data-cy="Todo" className={classNames('todo', { completed: status })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={status}
          aria-label={`${completed ? 'completed' : 'active'} todo`}
          onChange={toggle}
        />
      </label>
      {isEditing ? (
        <form onSubmit={submitEditing}>
          <input
            data-cy="TodoTitleField"
            type="text"
            ref={input}
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={value}
            onBlur={submitEditing}
            onChange={e => setValue(e.target.value)}
            onKeyUp={onEscape}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {value}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={deleteTodo}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
