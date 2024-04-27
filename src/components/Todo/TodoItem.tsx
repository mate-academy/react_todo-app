import { FC, useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/state';
import { Action } from '../../types/actions';
import { DispatchContext } from '../../store/todoReducer';

type Props = {
  todo: Todo;
};

export const TodoItem: FC<Props> = ({ todo }) => {
  const [updateMode, setUpdateMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const newTitleRef = useRef<HTMLInputElement>(null);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (updateMode) {
      if (newTitleRef.current) {
        newTitleRef.current.focus();
      }
    }
  }, [updateMode]);

  const saveNewTitle = () => {
    if (newTitle.length === 0) {
      dispatch({
        type: Action.deleteTodo,
        payload: todo.id,
      });
    }

    dispatch({
      type: Action.updateTodo,
      payload: { id: todo.id, changes: newTitle.trim() },
    });

    setUpdateMode(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    saveNewTitle();
  };

  return (
    <li key={todo.id}>
      <div data-cy="Todo" className={`todo ${todo.completed && 'completed'}`}>
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={() =>
              dispatch({
                type: Action.updateTodo,
                payload: { id: todo.id, changes: !todo.completed },
              })
            }
          />
        </label>
        {updateMode ? (
          <>
            <form onSubmit={event => handleSubmit(event)}>
              <input
                data-cy="TodoTitleField"
                type="text"
                ref={newTitleRef}
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={newTitle}
                onKeyDown={event => {
                  if (event.key === 'Escape') {
                    setUpdateMode(false);
                    setNewTitle(todo.title);
                  }
                }}
                onChange={event => setNewTitle(event.target.value)}
                onBlur={() => saveNewTitle()}
              />
            </form>
          </>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => setUpdateMode(true)}
            >
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() =>
                dispatch({ type: Action.deleteTodo, payload: todo.id })
              }
            >
              ×
            </button>
          </>
        )}
      </div>
    </li>
  );
};
