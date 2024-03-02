import { useEffect, useState } from 'react';
import { TodoDispatch } from '../types/DispatchType';
import { Todo } from '../types/TodoType';

interface Props {
  todo: Todo;
  hasTodos: boolean;
  dispatch: TodoDispatch;
}

export default function TodoItem({ todo, dispatch, hasTodos }: Props) {
  const [checked, setChecked] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(todo.name);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleSubmit = () => {
    dispatch({
      type: 'edit-todo',
      payload: { id: todo.id, name: editedName },
    });
    setEditing(false);
  };

  const handlekeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    setChecked(todo.completed);
  }, [todo.completed]);

  const handleClick = () => {
    dispatch({
      type: 'toggle-todo',
      payload: { id: todo.id },
    });
  };

  return (
    // eslint-disable-next-line no-nested-ternary
    <li className={editing ? 'editing' : todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          checked={todo.completed}
          onClick={handleClick}
        />
        {hasTodos && (
          <label
            htmlFor={`toggle-view-${todo.id}`}
            onDoubleClick={handleDoubleClick}
            className={checked ? 'completed' : ''}
          >
            {todo.name}
          </label>
        )}
        <button
          type="button"
          className="destroy"
          onClick={() =>
            dispatch({
              type: 'delete-todo',
              payload: { id: todo.id },
            })
          }
          data-cy="deleteTodo"
          aria-label="Delete todo"
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedName}
        onChange={changeName}
        onBlur={handleSubmit}
        onKeyDown={handlekeyPress}
      />
    </li>
  );
}
