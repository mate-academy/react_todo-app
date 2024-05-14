import React, { useContext, useEffect, useRef, useState } from 'react';
import { ToDo } from '../../types/ToDo';
import cn from 'classnames';
import { ToDoContext } from '../../context/ToDoProvider';

type Props = {
  item: ToDo;
};

export const ToDoItem: React.FC<Props> = ({ item }) => {
  const { dispatch } = useContext(ToDoContext);
  const [editTitle, setEditTitle] = useState(item.title);
  const onFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onFocus.current) {
      onFocus.current.focus();
    }
  }, [editTitle]);

  const handleEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch({ type: 'EDIT_TODO', payload: item.id, editTitle });
      setEditTitle('');
    } else if (e.key === 'Escape') {
      setEditTitle(item.title);
    }
  };

  const handleBlur = () => {
    if (editTitle.trim()) {
      dispatch({ type: 'EDIT_TODO', payload: item.id, editTitle });
    } else {
      dispatch({ type: 'EMPTY_TODO', payload: item.id });
    }
  };

  return (
    <li
      className={cn({
        completed: item.completed,
        editing: editTitle !== item.title,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          onChange={() =>
            dispatch({
              type: 'COMPLETE_TODO',
              payload: !item.completed,
              item: item.id,
            })
          }
        />
        <label onDoubleClick={() => setEditTitle(item.title)}>
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => dispatch({ type: 'CLEAR_TODO', payload: item.id })}
        />
      </div>
      <input
        ref={onFocus}
        onBlur={handleBlur}
        onKeyUp={handleEdit}
        value={editTitle}
        onChange={e => setEditTitle(e.target.value)}
        type="text"
        className="edit"
      />
    </li>
  );
};
