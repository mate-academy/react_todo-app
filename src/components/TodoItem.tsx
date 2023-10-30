import classNames from 'classnames';
import { useContext, useEffect, useRef } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo,
  editing: Todo | null,
  onEdit: (todo: Todo | null) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  editing,
  onEdit,
}) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const { onDeleteTodo, onUpdateTodos } = useContext(TodosContext);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const onEditSubmit = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentId: number,
  ) => {
    if (event.key === 'Escape') {
      onEdit(null);
    }

    if (event.key === 'Enter') {
      if (!editing?.title) {
        onDeleteTodo(currentId);
        onEdit(null);

        return;
      }

      if (editing) {
        onUpdateTodos({
          ...todo,
          title: editing.title,
        });
        onEdit(null);
      }
    }
  };

  return (
    <li
      className={classNames({
        completed,
        editing: id === editing?.id,
      })}
      onDoubleClick={() => {
        onEdit(todo);
      }}
    >
      <div className="view">
        <input
          checked={completed}
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onClick={() => onUpdateTodos({ ...todo, completed: !completed })}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete This Todo"
          onClick={() => onDeleteTodo(id)}
        />
      </div>
      <input
        ref={inputRef}
        value={editing?.title}
        type="text"
        className="edit"
        onChange={(event => onEdit({ ...todo, title: event.target.value }))}
        onKeyUp={(event) => onEditSubmit(event, id)}
      />
    </li>
  );
};
