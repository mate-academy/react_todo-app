/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classNames';
import { Todo } from '../../types/Todo';
import { useContext, useEffect, useRef } from 'react';
import { StateContext } from '../../Store';

interface Props {
  index: number;
  todo: Todo;
  isEditing: number | null;
  newTitle: string;
  onDelete: (id: number) => void;
  onToggle: (todo: Todo, index: number) => void;
  onStartEditing: (value: string, id: number) => void;
  onNewTodoTitle: (value: string) => void;
  onChangeTodoTitle: (
    event: React.FormEvent,
    todo: Todo,
    index: number,
  ) => void;
  onKey: (event: React.KeyboardEvent) => void;
}

export const TodoItem: React.FC<Props> = ({
  index,
  todo,
  onDelete,
  onToggle,
  newTitle,
  isEditing,
  onStartEditing,
  onNewTodoTitle,
  onChangeTodoTitle,
  onKey,
}) => {
  const newTitleFiled = useRef<HTMLInputElement>(null);
  const { selectedTodo } = useContext(StateContext);

  useEffect(() => {
    const currentField = newTitleFiled.current;

    if (currentField !== null) {
      currentField.focus();
    }
  }, [newTitleFiled, isEditing]);
  const { id, title, completed } = todo;

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          data-todoId={id}
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
          onClick={() => onToggle(todo, index)}
        />
      </label>
      {isEditing === id ? (
        <form onSubmit={event => onChangeTodoTitle(event, todo, index)}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={event => onNewTodoTitle(event?.target.value)}
            onBlur={event => onChangeTodoTitle(event, todo, index)}
            onKeyUp={onKey}
            ref={newTitleFiled}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => onStartEditing(title, id)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': selectedTodo.includes(id),
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
