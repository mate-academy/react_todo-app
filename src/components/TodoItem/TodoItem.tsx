import classNames from 'classnames';
import { Todo } from '../../types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../../TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodos, inputFocus } = useTodoContext();
  const { completed, title, id } = todo;

  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(title);

  const itemInput = useRef<HTMLInputElement>(null);

  const reset = () => {
    setIsEdit(false);
    itemInput.current?.blur();
    inputFocus?.current?.focus();
  };

  useEffect(() => {
    if (isEdit) {
      itemInput.current?.focus();

      window.addEventListener('keyup', (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsEdit(false);
          setEditText(title);
        }
      });
    }
  }, [isEdit, title]);

  const onDelete = useCallback(
    (todoId: number) => {
      setTodos(prevTodos =>
        prevTodos.filter(currentTodo => currentTodo.id !== todoId),
      );
      inputFocus?.current?.focus();
    },
    [setTodos, inputFocus],
  );

  const onToggle = (todoId: number) => {
    const newTodo = {
      ...todo,
      completed: !completed,
    };

    setTodos(prevTodos =>
      prevTodos.map(currentTodo =>
        currentTodo.id === todoId ? newTodo : currentTodo,
      ),
    );

    inputFocus?.current?.focus();
  };

  const handleEditSubmit = useCallback(() => {
    if (editText.length) {
      const newTodo = { ...todo, title: editText.trim() };

      setTodos(prevTodos =>
        prevTodos.map(currentTodo =>
          currentTodo.id === id ? newTodo : currentTodo,
        ),
      );
    } else {
      onDelete(id);
    }

    reset();
  }, [editText, title, todo, id, setTodos, inputFocus, onDelete, reset]);

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      {isEdit ? (
        <>
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              aria-label="Toggle todo status"
            />
          </label>

          <form onSubmit={handleEditSubmit}>
            <label>
              <input
                id="todoTitleField"
                ref={itemInput}
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                onBlur={handleEditSubmit}
                aria-label="todo title field"
              />
            </label>
          </form>
        </>
      ) : (
        <>
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              onChange={() => onToggle(id)}
              checked={completed}
              aria-label="Toggle todo status"
            />
          </label>

          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEdit(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
