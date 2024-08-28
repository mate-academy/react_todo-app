import cn from 'classnames';
import { Todo } from '../types/Todo';
import { useEffect, useRef, useState } from 'react';

type Props = {
  todo: Todo;
  toggleTodo: (todo: Todo) => void;
  deletePost: (id: number) => void;
  isLoading: boolean;
  updatedPost: (todo: Todo) => Promise<void>;
};

export const TodoComponent: React.FC<Props> = ({
  todo,
  toggleTodo,
  deletePost,
  isLoading,
  updatedPost,
}) => {
  const { id, title, completed } = todo;

  const [formTodo, setFormTodo] = useState(false);
  const [inputText, setInputText] = useState(title);

  const refInputUpdate = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueI = e.target.value;

    setInputText(valueI);
  };

  useEffect(() => {
    if (refInputUpdate.current) {
      refInputUpdate.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInputText(todo.title);
        setFormTodo(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [formTodo, todo.title]);

  const handleSubmit = async () => {
    const trimmedTitle = inputText.trim();

    setInputText(trimmedTitle);

    try {
      if (trimmedTitle.length <= 0) {
        await deletePost(id);
      } else {
        if (trimmedTitle !== todo.title) {
          await updatedPost({ ...todo, title: trimmedTitle });
        }
      }

      setFormTodo(false);
    } catch {}
  };

  const handleOnBlur = () => {
    const trimmedTitle = inputText.trim();

    setInputText(trimmedTitle);
    handleSubmit();
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div key={id} data-cy="Todo" className={cn('todo', { completed })}>
      <label className="todo__status-label" htmlFor={`todo-status-${id}`}>
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          id={`todo-status-${id}`}
          checked={completed}
          onChange={() => toggleTodo(todo)}
        />
        <span className="visually-hidden">Mark as completed</span>
      </label>

      {formTodo ? (
        <form onSubmit={handleSubmitForm}>
          <input
            data-cy="TodoTitleField"
            className="todo__title-field"
            type="text"
            value={inputText}
            onChange={handleInputChange}
            ref={refInputUpdate}
            onBlur={handleOnBlur}
            placeholder="Empty todo will be deleted"
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={e => {
              e.preventDefault();
              setFormTodo(true);
            }}
          >
            {inputText}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => deletePost(id)}
          >
            ×
          </button>
        </>
      )}
      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
