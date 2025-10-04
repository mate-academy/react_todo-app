import { FC, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  handleDeleteTodo: (id: number) => void;
  handleToggleCompleted: (id: number) => void;
  handleUpdateTodo: (updatedTodo: Todo) => void;
  mainRef: React.RefObject<HTMLInputElement>;
};

export const Main: FC<Props> = ({
  todos,
  handleDeleteTodo = () => {},
  handleToggleCompleted = () => {},
  handleUpdateTodo = () => {},
  mainRef,
}) => {
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const editTodoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (tempTodo) {
      editTodoRef.current?.focus();
    }
  }, [tempTodo]);

  const editTempTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!tempTodo) return;
    const newTodo = e.target.value;

    setTempTodo({ ...tempTodo, title: newTodo });
  };

  const handleDounbleClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    tempTodo: Todo,
  ) => {
    setTempTodo(tempTodo);
    editTodoRef.current?.focus();
  };

  const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tempTodo) {
      handleUpdateTodo(tempTodo);
      setTempTodo(null);
      editTodoRef.current = null;
      mainRef.current?.focus();
    }

    if (e.key === 'Escape') {
      setTempTodo(null);
      editTodoRef.current = null;
      mainRef.current?.focus();
    }
  };

  const handleBlur = () => {
    if (tempTodo?.title.trim() === '') {
      handleDeleteTodo(tempTodo.id);
      setTempTodo(null);
      editTodoRef.current = null;
      mainRef.current?.focus();
      return;
    }
    if (tempTodo) {
      handleUpdateTodo(tempTodo);
      setTempTodo(null);
      editTodoRef.current = null;
      mainRef.current?.focus();
      return;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
            />
          </label>

          {tempTodo && tempTodo?.id === todo.id ? (
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={tempTodo.title}
                onChange={e => editTempTodo(e)}
                onKeyDown={e => handleKeyboardEvent(e)}
                ref={editTodoRef}
                onBlur={handleBlur}
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={e => handleDounbleClick(e, todo)}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}

      {/* This todo is an active todo */}
      {/* <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          Not Completed Todo
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      </div> */}

      {/* This todo is being edited */}

      {/* <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label> */}

      {/* This form is shown instead of the title and remove button */}
      {/* <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      </div> */}
    </section>
  );
};
