import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { deleteTodo, updateTodo } from '../../api/todos';
import { ErrorTodo } from '../../types/ErrorTodo';
import { Todo } from '../../types/Todo';
import { AppContext } from '../AppContext';

type Props = {
  todo: Todo,
};

enum Loader {
  Show = 'block',
  Hide = 'none',
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    showErrorMessage,
    todosFromServer,
    setTodosFromServer,
    idOfTodosForLoader: idOfTodosForUpdate,
  } = useContext(AppContext);
  const [showLoader, setShowLoader] = useState<Loader>(Loader.Hide);
  const [isRenamingTodo, setIsRenamingTodo] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (idOfTodosForUpdate.includes(todo.id)) {
      setShowLoader(Loader.Show);
    } else {
      setShowLoader(Loader.Hide);
    }
  }, [idOfTodosForUpdate]);

  useEffect(() => {
    if (todo.id === 0) {
      setShowLoader(Loader.Show);
    }
  }, []);

  const deletionTodo = async () => {
    setShowLoader(Loader.Show);
    const deletedTodo = await deleteTodo(todo.id);

    try {
      if (typeof deletedTodo !== 'number' && 'Error' in deletedTodo) {
        throw new Error();
      }

      if (todosFromServer?.length === 1) {
        setTodosFromServer(undefined);

        return;
      }

      if (todosFromServer) {
        setTodosFromServer(todosFromServer.filter(
          todoFromServer => todoFromServer.id !== todo.id,
        ));
      }
    } catch {
      showErrorMessage(ErrorTodo.Delete);
    } finally {
      setShowLoader(Loader.Hide);
    }
  };

  const [newTodos, setNewTodos] = useState<Todo>();

  const updatingTodo = async (
    title: string, completed: boolean = todo.completed,
  ) => {
    setShowLoader(Loader.Show);

    const updatedTodo = await updateTodo({
      ...todo,
      completed,
      title,
    });

    try {
      if ('Error' in updatedTodo) {
        throw new Error();
      }

      setNewTodos(updatedTodo);
    } catch {
      setNewTitle(todo.title);
      showErrorMessage(ErrorTodo.Update);
    } finally {
      setShowLoader(Loader.Hide);
    }
  };

  const updateTitleTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsRenamingTodo(false);

    if (newTitle === todo.title) {
      return;
    }

    if (!newTitle.length) {
      deletionTodo();

      return;
    }

    updatingTodo(newTitle);
  };

  const cancelUpdating = (key: string) => {
    if (key === 'Escape') {
      setIsRenamingTodo(false);
      setNewTitle(todo.title);
    }
  };

  let lastTap = 0;
  let timeout: ReturnType<typeof setTimeout>;

  const habdleDoubleTap = (event: React.TouchEvent<HTMLSpanElement>) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    clearTimeout(timeout);

    if (tapLength < 500 && tapLength > 0) {
      setIsRenamingTodo(true);
      event.preventDefault();
    } else {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
      }, 500);
    }

    lastTap = currentTime;
  };

  useEffect(() => {
    setTodosFromServer(todosFromServer?.map(
      todoFromServer => (
        todoFromServer.id === newTodos?.id ? newTodos : todoFromServer
      ),
    ));
  }, [newTodos]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [isRenamingTodo]);

  return (
    <>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
          onClick={() => updatingTodo(todo.title, !todo.completed)}
        />
      </label>
      {isRenamingTodo
        ? (
          <form
            onSubmit={updateTitleTodo}
            onBlur={updateTitleTodo}
          >
            <input
              className="todo__title-field"
              type="text"
              value={newTitle}
              onKeyDown={(event) => cancelUpdating(event.key)}
              onChange={(event) => setNewTitle(event.target.value)}
              ref={newTodoField}
            />
          </form>
        )
        : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setIsRenamingTodo(true)}
              onTouchEnd={habdleDoubleTap}
            >
              { todo.title }
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDeleteButton"
              onClick={deletionTodo}
            >
              ×
            </button>
          </>
        )}

      <div
        data-cy="TodoLoader"
        className="modal overlay"
        style={{ display: showLoader }}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </>
  );
};
