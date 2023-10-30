import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { TodosContext } from '../../store/TodoProvider';
import { ActionType, Item } from '../../types/Todo';

type Props = {
  item: Item,
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { dispatch } = useContext(TodosContext);
  const [editing, setEditing] = useState(false);
  const fieldRef = useRef<HTMLInputElement>(null);

  const { id, title, completed } = item;

  const toggleTodoItem = () => {
    dispatch({ type: ActionType.TOGGLE, payload: id });
  };

  const removeTodoItem = () => {
    dispatch({ type: ActionType.REMOVE, payload: id });
  };

  const handleChangeTitle = () => {
    if (editing && fieldRef.current) {
      if (fieldRef.current.value.trim()) {
        dispatch({
          type: ActionType.UPDATE,
          payload: { ...item, title: fieldRef.current.value },
        });
      } else {
        dispatch({ type: ActionType.REMOVE, payload: id });
      }
    }

    setEditing(false);
  };

  const handleFieldKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Escape':
        setEditing(false);
        break;
      case 'Enter':
        handleChangeTitle();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (editing && fieldRef.current) {
      fieldRef.current.focus();
      fieldRef.current.value = title;
    }
  }, [editing, title]);

  return (
    <li className={cn({ completed, editing })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={toggleTodoItem}
        />
        <label
          onDoubleClick={() => setEditing(true)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={removeTodoItem}
          aria-label="deleteTodo"
          data-cy="deleteTodo"
        />
      </div>
      <input
        ref={fieldRef}
        className="edit"
        type="text"
        onBlur={handleChangeTitle}
        onKeyUp={handleFieldKeyUp}
      />
    </li>
  );
};
