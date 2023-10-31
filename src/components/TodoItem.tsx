import classNames from 'classnames';
import { useContext, useEffect, useRef } from 'react';
import { Action, Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo,
  selectedTodo: Todo | null,
  onEdit: (todo: Todo | null) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodo,
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
    if (selectedTodo) {
      inputRef.current?.focus();
    }
  }, [selectedTodo]);

  const onEditSubmit = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentId: number,
  ) => {
    switch (event.key) {
      case Action.Escape:
        onEdit(null);
        break;

      case Action.Enter: {
        if (!selectedTodo?.title) {
          onDeleteTodo(currentId);
          onEdit(null);

          return;
        }

        if (selectedTodo) {
          onUpdateTodos({
            ...todo,
            title: selectedTodo.title,
          });
          onEdit(null);
        }

        break;
      }

      default:
        break;
    }
  };

  return (
    <li
      className={classNames({
        completed,
        editing: id === selectedTodo?.id,
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
        value={selectedTodo?.title}
        type="text"
        className="edit"
        onChange={(event => onEdit({ ...todo, title: event.target.value }))}
        onKeyUp={(event) => onEditSubmit(event, id)}
      />
    </li>
  );
};
