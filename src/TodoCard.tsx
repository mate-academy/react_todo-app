import React, {
  useState, useRef, useEffect,
} from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { useTodo } from './TodoContext';
import { deleteTodos, updateTodos, renameTodos } from './api/todos';
import { ErrorStatus } from './types/Error';
import { Loader } from './Loader';

type Props = {
  todos: Todo[],
  currentTodo: Todo,
};

export const TodoCard: React.FC<Props> = ({
  todos,
  currentTodo,
}) => {
  const {
    setTodos,
    setError,
    selectedTodo,
    setSelectedTodo,
    todosToDelete,
    toggleAll,
  } = useTodo();
  const [updatedTitle, setUpdatedTitle] = useState(currentTodo.title);
  const [isUpdating, setIsUpdating] = useState(false);
  const focusedInput = useRef<HTMLInputElement>(null);
  const remove = async () => {
    setIsUpdating(true);
    setError(ErrorStatus.none);

    try {
      await deleteTodos(currentTodo.id);

      setTodos(
        todos.filter(todo => todo.id !== currentTodo.id),
      );
    } catch {
      setUpdatedTitle(currentTodo.title);
      setError(ErrorStatus.delete);
    } finally {
      setIsUpdating(false);
    }
  };

  const rename = async () => {
    if (updatedTitle !== '') {
      setError(ErrorStatus.none);
      setIsUpdating(true);

      try {
        await renameTodos(
          currentTodo.id,
          updatedTitle,
        ).then((response) => {
          setTodos((prevTodos) => {
            return (
              prevTodos.map(todo => (
                todo.id === currentTodo.id
                  ? {
                    ...todo,
                    title: response.title,
                  }
                  : todo))
            );
          });
        });
      } catch {
        setError(ErrorStatus.update);
        setUpdatedTitle(currentTodo.title);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleDbClick = () => {
    setSelectedTodo(currentTodo);
  };

  const updateHandler = () => {
    if (updatedTitle === '') {
      remove();
    }

    if (updatedTitle !== currentTodo.title) {
      rename();
    }

    setSelectedTodo(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(event.target.value);
  };

  const handleToggle = async () => {
    setError(ErrorStatus.none);
    setIsUpdating(true);

    try {
      await updateTodos(
        currentTodo.id,
        !currentTodo.completed,
      ).then((response) => {
        setTodos((prevTodos) => {
          return (
            prevTodos.map(todo => (
              todo.id === currentTodo.id
                ? {
                  ...todo,
                  completed: response.completed,
                } : todo))
          );
        });
      });
    } catch {
      setError(ErrorStatus.update);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConfirm = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setUpdatedTitle(currentTodo.title);
      setSelectedTodo(null);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      updateHandler();
    }
  };

  useEffect(() => {
    if (todosToDelete.includes(currentTodo.id)) {
      setIsUpdating(true);
    } else {
      setIsUpdating(false);
    }
  }, [todosToDelete]);

  useEffect(() => {
    if (toggleAll === 'completed' && !currentTodo.completed) {
      setIsUpdating(true);
    } else if (toggleAll === 'active' && currentTodo.completed) {
      setIsUpdating(true);
    } else {
      setIsUpdating(false);
    }
  }, [toggleAll]);

  useEffect(() => {
    if (focusedInput.current) {
      focusedInput.current.focus();
    }
  }, [selectedTodo]);

  return (
    <li className={classNames({
      completed: currentTodo.completed && currentTodo !== selectedTodo,
      editing: currentTodo === selectedTodo,
    })}
    >
      <div className={classNames('view', { 'view--updating': isUpdating })}>
        <input
          type="checkbox"
          className="toggle"
          id={currentTodo.completed ? 'toggle-view' : 'toggle-completed'}
          checked={currentTodo.completed}
          onChange={handleToggle}
        />

        <label
          onDoubleClick={handleDbClick}
        >
          {currentTodo.title}
        </label>

        <button
          type="button"
          className="destroy"
          aria-label="delete"
          data-cy="deleteTodo"
          onClick={remove}
        />
      </div>

      <input
        type="text"
        ref={focusedInput}
        className="edit"
        placeholder="Empty todo will be deleted"
        value={updatedTitle}
        onBlur={updateHandler}
        onChange={handleChange}
        onKeyUp={handleConfirm}
      />

      {isUpdating && (
        <div className="loader_container">
          <Loader />
        </div>
      )}
    </li>
  );
};
