import { FC, useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/todo';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../../context/Store';

type Props = {
  mainRef: React.RefObject<HTMLInputElement>;
};

export const Main: FC<Props> = ({ mainRef }) => {
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const editTodoRef = useRef<HTMLInputElement | null>(null);

  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

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

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLSpanElement>,
    tempTodo: Todo,
  ) => {
    setTempTodo(tempTodo);
    editTodoRef.current?.focus();
  };

  const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tempTodo) {
      dispatch({ type: 'updateTodo', payload: tempTodo });
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
      dispatch({ type: 'remove', payload: tempTodo.id });
      setTempTodo(null);
      editTodoRef.current = null;
      mainRef.current?.focus();
      return;
    }
    if (tempTodo) {
      dispatch({ type: 'updateTodo', payload: tempTodo });
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
              onChange={() =>
                dispatch({ type: 'toggleCompleted', payload: todo.id })
              }
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
                onDoubleClick={e => handleDoubleClick(e, todo)}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => dispatch({ type: 'remove', payload: todo.id })}
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};
