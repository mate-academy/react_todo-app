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

  const { todos, filteredTodos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (tempTodo) {
      editTodoRef.current?.focus();
    }
  }, [tempTodo]);

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(null);
    }
  }, [todos]);

  const editTempTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!tempTodo) return;
    const newTodo = e.target.value;

    setTempTodo({ ...tempTodo, title: newTodo });
  };

  const handleDoubleClick = (tempTodo: Todo) => {
    setTempTodo(tempTodo);
    editTodoRef.current?.focus();
  };

  const handleKeyboardEvent = (
    e: React.KeyboardEvent<HTMLInputElement>,
    oldTempTodo: Todo,
    newTempTodo: Todo,
  ) => {
    if (e.key === 'Enter' && oldTempTodo) {
      e.preventDefault();
      dispatch({
        type: 'updateTodo',
        payload: {
          ...oldTempTodo,
          title: oldTempTodo.title.trim(),
        },
      });
      setTempTodo(null);
      editTodoRef.current = null;
      mainRef.current?.focus();
    }

    if (e.key === 'Escape') {
      dispatch({
        type: 'updateTodo',
        payload: {
          ...oldTempTodo,
          title: newTempTodo.title,
        },
      });

      editTodoRef.current = null;
      mainRef.current?.focus();
    }
  };

  function updateTitle(newTodo: Todo, oldTodo: Todo) {
    const isEdit = newTodo.id === oldTodo.id && newTodo.title === oldTodo.title;

    if (isEdit) {
      return;
    }
  }

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement, Element>,
    updateTodo: Todo,
  ) => {
    event.preventDefault();
    if (updateTodo.title.trim() === '') {
      dispatch({ type: 'remove', payload: updateTodo.id });
      setTempTodo(null);
      editTodoRef.current = null;
      mainRef.current?.focus();
      return;
    }
    if (updateTodo.title) {
      dispatch({
        type: 'updateTodo',
        payload: updateTodo,
      });
      setTempTodo(null);
      editTodoRef.current = null;
      mainRef.current?.focus();
      return;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
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
                onKeyDown={e => handleKeyboardEvent(e, tempTodo, todo)}
                onKeyUp={e => handleKeyboardEvent(e, tempTodo, todo)}
                ref={editTodoRef}
                onBlur={event => handleBlur(event, tempTodo)}
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => handleDoubleClick(todo)}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => {
                  dispatch({ type: 'remove', payload: todo.id });
                  mainRef.current?.focus();
                }}
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
