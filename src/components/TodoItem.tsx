/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { useGlobalDispatch, useGlobalState } from '../hooks/useGlobal';

type TodoItemProps = {
  todo: Todo;
  removeTodo: (todo: Todo) => void;
  handleUpdateTodo: (id: number, data: Omit<Todo, 'id' | 'userId'>) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo: { id, title, completed, userId },
  removeTodo,
  handleUpdateTodo,
}) => {
  const { todos, activeTodoId, editTodo } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [editedTitle, setEditedTitle] = useState(title);
  const wasEscPressed = useRef(false);

  const submitTitleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (editTodo === null) {
      return;
    }

    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) {
      const todoToRemove = todos.find(todo => todo.id === editTodo);

      if (todoToRemove) {
        removeTodo(todoToRemove);
      }

      return;
    }

    if (trimmedTitle === title.trim()) {
      dispatch({ type: 'setEditTodo', payload: null });

      return;
    }

    await handleUpdateTodo(editTodo, {
      title: trimmedTitle,
      completed: completed,
    });

    dispatch({
      type: 'setTodos',
      payload: todos.map(todo =>
        todo.id === editTodo ? { ...todo, title: trimmedTitle } : todo,
      ),
    });

    dispatch({
      type: 'setVisibleTodos',
      payload: todos.map(todo =>
        todo.id === editTodo ? { ...todo, title: trimmedTitle } : todo,
      ),
    });

    dispatch({ type: 'setEditTodo', payload: null });
  };

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { completed: completed },
        { hidden: !todos.length },
      )}
      key={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {
            handleUpdateTodo(id, { title: title, completed: !completed });
          }}
        />
      </label>

      {editTodo === id ? (
        <form onSubmit={submitTitleUpdate}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editedTitle}
            onBlur={event => {
              if (wasEscPressed.current) {
                wasEscPressed.current = false;

                return;
              }

              submitTitleUpdate(event);
            }}
            onKeyUp={ev => {
              if (ev.key === 'Escape') {
                wasEscPressed.current = true;
                dispatch({ type: 'setEditTodo', payload: null });
                setEditedTitle(title);
              }
            }}
            onChange={ev => setEditedTitle(ev.target.value)}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              dispatch({ type: 'setEditTodo', payload: id });
            }}
          >
            {title}
          </span>

          {/* Remove button appears only on hover */}

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              removeTodo({ id, title, completed, userId });
            }}
          >
            ×
          </button>
        </>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal', 'overlay', {
          'is-active': activeTodoId === id,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader is-active" />
      </div>
    </div>
  );
};
