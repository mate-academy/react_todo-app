import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[],
  tempTodo: Todo | null,
  idProcessed: number[],
  disableList: boolean,
  onDelete: (todoId: number) => void,
  onUpdate: (todoId: number, todoTitle: string, todoCompleted: boolean) => void,
  setIdProcessed: (value: React.SetStateAction<number[]>) => void
}

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  idProcessed,
  disableList,
  onDelete,
  onUpdate,
  setIdProcessed,
}) => {
  const [formIsOpenId, setFormIsOpenId] = useState(0);
  const [query, setQuery] = useState('');

  const onRemove = (todoId: number | undefined) => {
    if (todoId) {
      setIdProcessed([todoId]);
      onDelete(todoId);
    }
  };

  const onChangeComplete = (
    todoId: number, title: string, completed: boolean,
  ) => {
    if (todoId) {
      setIdProcessed([todoId]);
      setFormIsOpenId(0);
      onUpdate(todoId, title, completed);
    }
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(ev.currentTarget.value);
  };

  const handleBlur = (
    todoId: number, title: string, completed: boolean,
  ) => onChangeComplete(todoId, title, completed);

  const onSubmit = (title: string, id: number, completed: boolean) => {
    if (query.length === 0) {
      onRemove(id);

      return;
    }

    if (query !== title && query.trim().length) {
      onChangeComplete(id, query, completed);

      setFormIsOpenId(0);
    }
  };

  return (
    <section className="todoapp__main is-loading">
      {todos.map(todo => (
        <div
          className={classNames(
            'todo',
            {
              completed: todo.completed,
            },
          )}
          key={todo.id}
          onDoubleClick={() => {
            setQuery(todo.title);
            setFormIsOpenId(todo.id);
          }}
        >
          <label
            className="todo__status-label"
          >
            <input
              type="checkbox"
              className="todo__status"
              disabled={disableList}
              onChange={
                () => onChangeComplete(todo.id, todo.title, !todo.completed)
              }
            />
          </label>

          {formIsOpenId !== todo.id ? (
            <>
              <span className="todo__title">{todo.title}</span>

              <button
                type="button"
                className="todo__remove"
                onClick={() => onRemove(todo.id)}
                disabled={disableList}
              >
                ×
              </button>
            </>
          ) : null}

          {formIsOpenId === todo.id ? (
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
                onSubmit(todo.title, todo.id, todo.completed);
              }}
            >
              <label>
                <input
                  type="text"
                  className="todo__title-field"
                  id={`${todo.id}`}
                  value={query}
                  onChange={handleChange}
                  onBlur={() => {
                    if (query.length === 0) {
                      onRemove(todo.id);

                      return;
                    }

                    if (query !== todo.title && query.trim().length) {
                      handleBlur(todo.id, query, todo.completed);

                      return;
                    }

                    setFormIsOpenId(0);
                  }}
                  onKeyUp={(ev) => {
                    if (formIsOpenId && ev.key === 'Escape') {
                      setFormIsOpenId(0);
                    }
                  }}
                />
              </label>
            </form>
          ) : null }

          <div className={classNames('modal overlay', {
            'is-active': idProcessed.includes(todo.id),
          })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}

      {tempTodo ? (
        <div
          className={classNames(
            'todo',
            {
              completed: tempTodo.completed,
            },
          )}
        >
          <label
            className="todo__status-label"
          >
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>

          <span className="todo__title">{tempTodo.title}</span>

          <button
            type="button"
            className="todo__remove"
          >
            ×
          </button>

          <div className={classNames('modal overlay', {
            'is-active': tempTodo.id === 0,
          })}
          >
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ) : tempTodo}
    </section>
  );
};
