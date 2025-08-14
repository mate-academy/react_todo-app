/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Todo } from '../types/Todo';
import { useContext, useRef } from 'react';
import { VisibleTodosContext } from '../context/context';

type Props = {
  tempTodo: Todo | null;
  handleInputDoubleClick: (todo: Todo) => void;
  onChecked: (todo: Todo) => void;
  editingId: number | null;
  titleForEditing: string;
  setTitleForEditing: React.Dispatch<React.SetStateAction<string>>;
  handleUpdateTodo: (updatedTodo: Todo) => void;
  editInputRef: React.RefObject<HTMLInputElement>;
  handleDelete: (todoId: number) => void;
  savingIds: number[];
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  error: string;
};

export const TodoElem: React.FC<Props> = ({
  tempTodo,
  handleInputDoubleClick,
  onChecked,
  editingId,
  titleForEditing,
  setTitleForEditing,
  handleUpdateTodo,
  editInputRef,
  handleDelete,
  savingIds,
  setEditingId,
  error,
}) => {
  const visibleTodos = useContext(VisibleTodosContext);
  const escRef = useRef(false);
  const previousInput = useRef('');

  const onKeyUp = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      escRef.current = true;
      setEditingId(null);
      editInputRef.current?.blur();
    }
  };

  const onBlur = (todo: Todo) => {
    if (escRef.current) {
      return;
    }

    if (
      previousInput.current !== titleForEditing &&
      titleForEditing.trim().length > 0
    ) {
      handleUpdateTodo({ ...todo, title: titleForEditing });
    } else if (titleForEditing.trim().length === 0) {
      setEditingId(todo.id);
      handleDelete(todo.id);
    } else if (
      previousInput.current === titleForEditing &&
      error.length === 0
    ) {
      setEditingId(null);
    }
  };

  return (
    <>
      {visibleTodos.map(todo => (
        <CSSTransition key={todo.id} timeout={300} classNames="item">
          <div
            data-cy="Todo"
            className={classNames('todo', { completed: todo.completed })}
            key={todo.id}
            onDoubleClick={() => {
              handleInputDoubleClick(todo);
              escRef.current = false;
              previousInput.current = todo.title;
            }}
          >
            <label
              className="todo__status-label"
              onClick={() => onChecked(todo)}
            >
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
              />
            </label>

            {editingId === todo.id && editingId ? (
              <form
                onSubmit={e => {
                  e.preventDefault();

                  if (titleForEditing.trim() === '') {
                    handleDelete(todo.id);
                  } else if (
                    previousInput.current !== titleForEditing &&
                    titleForEditing.trim().length > 0
                  ) {
                    handleUpdateTodo({ ...todo, title: titleForEditing });
                  } else {
                    setEditingId(null);
                  }
                }}
                onKeyUp={e => onKeyUp(e)}
              >
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  placeholder="Empty todo will be deleted"
                  value={titleForEditing}
                  onChange={e => setTitleForEditing(e.target.value)}
                  ref={editInputRef}
                  onBlur={() => onBlur(todo)}
                />
              </form>
            ) : (
              <>
                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => handleDelete(todo.id)}
                >
                  ×
                </button>
              </>
            )}

            {(tempTodo?.id === todo.id ||
              (savingIds.includes(todo.id) && todo.id === 0)) && (
              <div className="modal overlay is-active" data-cy="TodoLoader">
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            )}
          </div>
        </CSSTransition>
      ))}

      {tempTodo && (
        <CSSTransition key={0} timeout={300} classNames="temp-item">
          <div data-cy="Todo" className="todo" key="tempTodo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={tempTodo.completed}
                disabled
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {tempTodo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              disabled
            >
              ×
            </button>

            <div className="modal overlay is-active" data-cy="TodoLoader">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </CSSTransition>
      )}
    </>
  );
};
