import { FC, useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../../store/store';

import classNames from 'classnames';
import { filteredTodos } from '../../utils/getFilteredTodos';

const Main: FC = () => {
  const { todos, selectedTodo, status } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [title, setTitle] = useState<string | undefined>(
    selectedTodo?.title ?? '',
  );

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

  const visibleTodos = filteredTodos(todos, status);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
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

  const handleBlur = () => {
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
      {visibleTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', {
            completed: todo.completed === true,
          })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id || 0)}
            />
          </label>

          {selectedTodo && selectedTodo.id === todo.id ? (
            <form onSubmit={handleSubmit}>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onBlur={handleBlur}
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
                onClick={() =>
                  dispatch({ type: 'delete', payload: todo.id || 0 })
                }
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
