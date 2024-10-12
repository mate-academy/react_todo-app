import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

import { DispatchContext } from '../../store/store';

interface Props {
  todo: Todo;
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const dispatch = useContext(DispatchContext);

  const handleCompletedTodo = () => {
    dispatch({
      type: 'changeTodo',
      payload: {
        ...todo,
        completed: !todo.completed,
      },
    });
  };

  const handleDeleteTodo = () => {
    dispatch({ type: 'removeTodo', payload: todo.id });
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
  };

  const handleTitleSave = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      handleDeleteTodo();

      return;
    }

    dispatch({
      type: 'changeTodo',
      payload: {
        ...todo,
        title: trimmedTitle,
      },
    });

    setIsEditing(false);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setTitle(todo.title);
    } else if (event.key === 'Enter') {
      handleTitleSave();
    }
  };

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('keyup', handleKeyUp);
    }
    // else {
    //   document.addEventListener('keyup', handleKeyUp);
    // }

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isEditing, handleKeyUp]);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
      onDoubleClick={() => setIsEditing(true)}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.completed}
          onChange={handleCompletedTodo}
        />
      </label>

      {!isEditing ? (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDeleteTodo}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            autoFocus
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleSave}
          />
        </form>
      )}
    </div>
  );
};
