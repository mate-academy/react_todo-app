import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { titleChanger } from '../utils/functions';
import { Error } from '../types/ErrorEnum';
import { patchTodo } from '../api/todos';

type Props = {
  todo: Todo;
  todosUpdater: (prevState: Todo[]) => void;
  todos: Todo[];
  errorNotification: (err: Error) => void
};

export const TodoCard: React.FC<Props> = ({
  todo,
  todosUpdater,
  todos,
  errorNotification,
}) => {
  const [todoOnEdit, setTodoOnEdit] = useState<Todo | null>(null);
  const [titleQuery, setTitleQuery] = useState<string>('');

  const { id, title, completed } = todo;

  const callbackRef = useCallback((inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const handleCompletedChange = () => {
    const todosCopy = [...todos].map(oneTodo => (
      (oneTodo.id === id) ? { ...oneTodo, completed: !completed } : oneTodo
    ));

    return todosUpdater(todosCopy);
  };

  const handleTodoDelete = () => {
    const todoDelete = todos.filter(oneTodo => oneTodo.id !== id);

    return todosUpdater(todoDelete);
  };

  const handleDBClick = () => {
    const todoToEdit = todos.find(oneTodo => oneTodo.id === id);

    if (todoToEdit) {
      setTodoOnEdit(todoToEdit);
      setTitleQuery(title);
    }
  };

  const handleEscapePress = () => setTodoOnEdit(null);

  const handleEnterPress = async () => {
    try {
      if (todoOnEdit && title !== titleQuery) {
        await patchTodo(id, { title });
        todosUpdater(titleChanger(todos, todoOnEdit, titleQuery));
      }
    } catch (error) {
      errorNotification(Error.UPDATE);
    } finally {
      handleEscapePress();
    }
  };

  const handleTitleSubmit = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      handleEnterPress();
    } else if (e.key === 'Escape') {
      handleEscapePress();
    }
  };

  const handleBlur = () => {
    if (!todoOnEdit) {
      return;
    }

    todosUpdater(titleChanger(todos, todoOnEdit, titleQuery));
    handleEscapePress();
  };

  const isTodoOnEdit = todoOnEdit && todoOnEdit.id === id;

  return (
    <li
      className={classNames(
        'todo',
        { completed },
      )}
    >
      <label className="todo__toggle-label">
        <input
          type="checkbox"
          className="todo__toggle"
          onClick={handleCompletedChange}
        />
      </label>

      {isTodoOnEdit ? (
        <form onBlur={handleBlur}>
          <input
            type="text"
            className="todo edit"
            placeholder="Empty todo will be deleted"
            value={titleQuery}
            onChange={(event) => {
              setTitleQuery(event.target.value);
            }}
            ref={callbackRef}
            onKeyDown={handleTitleSubmit}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDBClick}
          >
            {title}
          </span>

          <button
            aria-label="delete todo"
            type="button"
            className="todo__destroy"
            data-cy="deleteTodo"
            onClick={handleTodoDelete}
          />
        </>
      )}
    </li>
  );
};
