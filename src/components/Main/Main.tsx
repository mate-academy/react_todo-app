import { FC, useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../../store/store';

import classNames from 'classnames';

const Main: FC = () => {
  const { todos, selectedTodo, status } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [title, setTitle] = useState<string>(selectedTodo?.title ?? '');

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(selectedTodo?.title ?? '');
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [selectedTodo]);

  const handleToggleComplete = (id: number) => {
    dispatch({ type: 'toggle-completed', payload: id });
  };

  const handleSubmitOrBlur = () => {
    const trimmedTitle = title?.trim();

    if (!trimmedTitle) {
      dispatch({ type: 'delete', payload: selectedTodo?.id || 0 });
    } else {
      const id = selectedTodo?.id || 0;

      dispatch({
        type: 'update-todo',
        payload: { ...selectedTodo, id, title: trimmedTitle },
      });
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setTitle(selectedTodo?.title ?? '');
      dispatch({ type: 'select-todo', payload: null });
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos
        .filter(todo => {
          switch (status) {
            case 'active':
              return !todo.completed;
            case 'completed':
              return todo.completed;
            default:
              return true;
          }
        })
        .map(todo => (
          <div
            key={todo.id}
            data-cy="Todo"
            className={classNames('todo', {
              completed: todo.completed,
              editing: selectedTodo && selectedTodo.id === todo.id,
            })}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
              />
            </label>

            {selectedTodo && selectedTodo.id === todo.id ? (
              <form onSubmit={handleSubmitOrBlur}>
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  onBlur={handleSubmitOrBlur}
                  ref={titleInputRef}
                  onKeyUp={handleKeyUp}
                />
              </form>
            ) : (
              <>
                <span
                  onDoubleClick={() => {
                    dispatch({ type: 'select-todo', payload: todo });
                  }}
                  data-cy="TodoTitle"
                  className="todo__title"
                >
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => dispatch({ type: 'delete', payload: todo.id })}
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

export default Main;
