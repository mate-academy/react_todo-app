import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { titleChanger } from '../utils/functions';
import { Error } from '../types/ErrorEnum';
import { deleteTodo, patchTodo } from '../api/todos';

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

  const handleCompletedChange = async () => {
    try {
      const todosCopy = [...todos].map(oneTodo => (
        (oneTodo.id === id) ? { ...oneTodo, completed: !completed } : oneTodo
      ));

      todosUpdater(todosCopy);

      await patchTodo(id, { completed: !completed });
    } catch (error) {
      errorNotification(Error.UPDATE);
    }

    const todosCopy = [...todos].map(oneTodo => (
      (oneTodo.id === id) ? { ...oneTodo, completed: !completed } : oneTodo
    ));

    return todosUpdater(todosCopy);
  };

  const handleTodoDelete = async () => {
    try {
      const todoDelete = todos.filter(oneTodo => oneTodo.id !== id);

      await deleteTodo(id);
      todosUpdater(todoDelete);
    } catch (error) {
      errorNotification(Error.DELETE);
    }
  };

  const handleDBClick = () => {
    setTodoOnEdit(todo);
    setTitleQuery(title);
  };

  const handleEscapePress = () => setTodoOnEdit(null);

  const handleEnterPress = async () => {
    try {
      if (todoOnEdit && title !== titleQuery) {
        todosUpdater(titleChanger(todos, todoOnEdit, titleQuery));
        await patchTodo(id, { title: titleQuery });
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
