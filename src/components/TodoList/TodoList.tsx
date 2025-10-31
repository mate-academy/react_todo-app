/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const { filteredTodos: todos, dispatch } = useContext(TodoContext);

  const [isEditingTodoId, setIsEditingTodoId] = useState<number | null>(null);

  const isEditingTodo = todos.find(todo => todo.id === isEditingTodoId);

  const [title, setTitle] = useState(isEditingTodo?.title);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditingTodoId]);

  useEffect(() => {
    if (isEditingTodo) {
      setTitle(isEditingTodo.title);
    }
  }, [isEditingTodo]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            key={todo.id}
          >
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                checked={todo.completed}
                className="todo__status"
                onChange={() =>
                  dispatch({ type: 'toggleTodo', payload: { id: todo.id } })
                }
              />
            </label>

            {isEditingTodoId === todo.id && (
              <form
                onSubmit={e => {
                  e.preventDefault();

                  if (title === '') {
                    dispatch({ type: 'delete', payload: { id: todo.id } });
                  } else {
                    dispatch({
                      type: 'edit',
                      payload: { id: todo.id, title: title?.trim() },
                    });
                    setIsEditingTodoId(null);
                  }
                }}
              >
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  ref={inputRef}
                  value={title}
                  onBlur={() => {
                    if (title === '') {
                      dispatch({ type: 'delete', payload: { id: todo.id } });
                    } else {
                      dispatch({
                        type: 'edit',
                        payload: { id: todo.id, title: title?.trim() },
                      });
                    }

                    setIsEditingTodoId(null);
                  }}
                  onKeyUp={e => {
                    if (e.key === 'Escape') {
                      setTitle(todo.title);

                      setIsEditingTodoId(null);
                    }
                  }}
                  onChange={e => setTitle(e.target.value)}
                />
              </form>
            )}
            {isEditingTodoId !== todo.id && (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => setIsEditingTodoId(todo.id)}
                >
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => {
                    dispatch({ type: 'delete', payload: { id: todo.id } });
                  }}
                >
                  ×
                </button>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};
