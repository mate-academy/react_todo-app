/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from './type';

type Props = {
  item: Todo,
  onRemove: (todoId: number) => void,
  onChangeStatus: (todo: Todo) => void,
  onChangeTitle: (todo: Todo, newTitle: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  item,
  onRemove,
  onChangeStatus,
  onChangeTitle,
}) => {
  const [editingStatus, setEditingStatus] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);

  const editTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setEditingStatus(false);
      setNewTitle(event.target.value);
      onChangeTitle(item, newTitle);

      if (!event.target.value) {
        onRemove(item.id);
      }
    }

    if (event.key === 'Escape') {
      setEditingStatus(false);
      setNewTitle(item.title);
    }
  };

  return (
    <li className={classNames(
      {
        completed: item.completed === true,
        editing: editingStatus,
      },
    )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={item.id.toString()}
          checked={item.completed}
          onChange={() => {
            onChangeStatus(item);
          }}
        />

        <label onDoubleClick={() => setEditingStatus(true)}>
          {item.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onRemove(item.id)}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={event => setNewTitle(event.target.value)}
        onKeyDown={editTodo}
      />
    </li>
  );
};
