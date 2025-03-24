import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Loader } from './Loader';
import { useEffect, useRef, useState } from 'react';
import { deleteTodo, updateTodo } from '../api/todos';

type Props = {
  todo: Todo;
  todos?: Todo[];
  loadTodos: number[];
  onChange?: (todos: Todo[]) => void;
  onLoad: (loadTodos: number[]) => void;
  onDelete?: (todoId: number) => void;
  onError?: (error: string) => void;
  onChangeChecked?: (todoId: number, checked: boolean) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  todos = [],
  loadTodos,
  onLoad,
  onChange = () => {},
  onDelete = () => {},
  onError = () => {},
  onChangeChecked = () => {},
}) => {
  const { title, completed, id, userId } = todo;
  const [focused, setFocused] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [valueTitle, setValueTitle] = useState(title);
  const field = useRef<HTMLInputElement>(null);
  const isLoad = loadTodos.includes(id);
  const isEscPressed = useRef(false);

  useEffect(() => {
    setValueTitle(title);
  }, [title]);

  const handleClick = () => {
    setFocused(true);
  };

  useEffect(() => {
    field.current?.focus();
  }, [focused]);

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      isEscPressed.current = true;
      setValueTitle(title);
      document.removeEventListener('keyup', handleEsc);
      field.current?.blur();
    }
  };

  const handleFocus = () => {
    document.addEventListener('keyup', handleEsc);
  };

  const handleDelete = () => {
    const newLoadTodos = [...loadTodos, id];

    setFocused(false);
    onLoad([...newLoadTodos]);

    deleteTodo(id)
      .then(() => {
        onDelete(id);
      })
      .catch(() => {
        onError('Unable to delete a todo');
        onDelete(-1);
      })
      .finally(() => {
        onLoad([...loadTodos]);
      });
  };

  const handleBlur = () => {
    setFocused(false);
    if (isEscPressed.current) {
      isEscPressed.current = false;
      document.removeEventListener('keyup', handleEsc);

      return;
    }

    if (valueTitle === '') {
      onLoad([...loadTodos, id]);

      setIsUpdating(true);

      deleteTodo(id)
        .then(() => {
          onDelete(id);
        })
        .catch(() => {
          onError('Unable to delete a todo');
          setFocused(true);
          field.current?.focus();
        })
        .finally(() => {
          onLoad(loadTodos.filter(todoId => todoId !== id));
          setIsUpdating(false);
        });

      return;
    }

    if (valueTitle.trim() !== title) {
      const newTodo: Todo = {
        id: id,
        userId: userId,
        title: valueTitle.trim(),
        completed: completed,
      };

      onLoad([...loadTodos, id]);

      setIsUpdating(true);

      updateTodo(id, newTodo)
        .then(response => {
          onChange(
            todos.map(todoItem => (todoItem.id === id ? response : todoItem)),
          );
        })
        .catch(() => {
          onError('Unable to update a todo');
          setFocused(true);
          field.current?.focus();
        })
        .finally(() => {
          onLoad(loadTodos.filter(todoId => todoId !== id));
          setIsUpdating(false);
        });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleBlur();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueTitle(event.target.value);
  };

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeChecked(id, event.target.checked);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label" htmlFor={`todoStatus-${id}`}>
        <input
          id={`todoStatus-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleChangeChecked}
        />
        {}
      </label>

      {focused || isUpdating ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={valueTitle}
            ref={field}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleClick}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      )}

      <Loader isLoad={isLoad} />
    </div>
  );
};
