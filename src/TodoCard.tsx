import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/todo';
import { titleChanger } from './utils/functions';

type Props = {
  id: number;
  completed: boolean;
  title: string;
  todosUpdater: (prevState: Todo[]) => void;
  todos: Todo[];
};

export const TodoCard: React.FC<Props> = ({
  id,
  title,
  completed,
  todosUpdater,
  todos,
}) => {
  const [todoOnEdit, setTodoOnEdit] = useState<Todo | null>(null);
  const [titleQuery, setTitleQuery] = useState<string>('');
  // const todoEditRef = createRef(null);

  const callbackRef = useCallback((inputElement: HTMLInputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const handleCompletedChange = () => {
    const todosCopy = [...todos];
    const changedTodoIndex = todosCopy.findIndex(todo => todo.id === id);
    const completedState = todosCopy[changedTodoIndex].completed;

    todosCopy[changedTodoIndex].completed = !completedState;

    return todosUpdater(todosCopy);
  };

  const handleTodoDelete = () => {
    const todoDelete = todos.filter(todo => todo.id !== id);

    return todosUpdater(todoDelete);
  };

  const handleDBClick = () => {
    const todoToEdit = todos.find(todo => todo.id === id);

    if (todoToEdit) {
      setTodoOnEdit(todoToEdit);
      setTitleQuery(todoToEdit.title);
    }
  };

  const handleEnterPress = () => {
    if (todoOnEdit) {
      if (todoOnEdit.title === titleQuery) {
        setTodoOnEdit(null);

        return;
      }

      todosUpdater(titleChanger(todos, todoOnEdit.title, titleQuery));
    }

    setTodoOnEdit(null);
  };

  const handleEscapePress = () => setTodoOnEdit(null);

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

    todosUpdater(titleChanger(todos, todoOnEdit.title, titleQuery));
    setTodoOnEdit(null);
  };

  return (
    <div
      key={id}
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

      {todoOnEdit && todoOnEdit.id === id && (
        <form onBlur={handleBlur}>
          <input
            type="text"
            className="todo__edit"
            placeholder="Empty todo will be deleted"
            value={titleQuery}
            onChange={(event) => {
              setTitleQuery(event.target.value);
            }}
            ref={callbackRef}
            onKeyDown={handleTitleSubmit}
          />
        </form>
      )}

      {!todoOnEdit && (
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
    </div>
  );
};
