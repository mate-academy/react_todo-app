/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { toogleTodo, deleteTodo, updateTodo } from '../../api/todos';
import { warningTimer } from '../../utils/warningTimer';

type Props = {
  todo: Todo;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setError: (error: boolean) => void;
};

export const TodoItem: React.FC<Props> = React.memo(({
  todo,
  setTodos,
  setError,
}) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [changedTitle, setChangedTitle] = useState(title);
  const editingTodo = useRef<HTMLInputElement>(null);
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const user = JSON.parse(localStorage.getItem('user')!);

  const removeTodo = useCallback(async () => {
    try {
      await deleteTodo(user.id, id);
      setTodos(currentTodos => currentTodos.filter(currentTodo => {
        return currentTodo.id !== id;
      }));
    } catch {
      setError(true);
      warningTimer(setError, false, 3000);
    }
  }, [todo]);

  const updateTodoTitle = useCallback(async (
    newTitle: string,
    todoId: number,
  ) => {
    await updateTodo(user.id, id, newTitle);

    setTodos(currentTodos => currentTodos.map(currentTodo => {
      if (currentTodo.id === todoId) {
        return {
          ...currentTodo,
          title: newTitle,
        };
      }

      return currentTodo;
    }));
  }, [isEditing]);

  const submitChangedTitle = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (changedTitle !== title) {
      updateTodoTitle(changedTitle, id);
      setIsEditing(false);
    }

    if (!changedTitle.length) {
      try {
        removeTodo();
        await deleteTodo(user.id, id);
      } catch {
        setError(true);
        warningTimer(setError, false, 3000);
      }
    }

    setIsEditing(false);
  }, [changedTitle]);

  const handleCancelEditing = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setChangedTitle(title);
    }
  }, [isEditing]);

  const onToogleTodo = useCallback(async () => {
    try {
      await toogleTodo(user.id, id, !completed);

      setTodos(currentTodos => currentTodos.map(currentTodo => {
        if (currentTodo.id === id) {
          return {
            ...currentTodo,
            completed: !currentTodo.completed,
          };
        }

        return currentTodo;
      }));
    } catch (error) {
      setError(true);
      warningTimer(setError, false, 3000);
    }
  }, [todo]);

  useEffect(() => {
    if (editingTodo.current) {
      editingTodo.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames(
        { completed },
        { editing: isEditing },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={onToogleTodo}
        />

        <label
          htmlFor="toggle-completed"
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={removeTodo}
        />
      </div>
      <form
        onSubmit={submitChangedTitle}
        onBlur={submitChangedTitle}
      >
        <input
          type="text"
          className="edit"
          ref={editingTodo}
          value={changedTitle}
          onChange={(event) => setChangedTitle(event.target.value)}
          onKeyDown={handleCancelEditing}
        />
      </form>
    </li>
  );
});
