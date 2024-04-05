import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from './type/Todo';
import cn from 'classnames';
import { TodoContext } from './TodoProvider';

type Props = {
  item: Todo;
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { dispatch } = useContext(TodoContext);
  const [currentItem, setCurrentItem] = useState<null | Todo>(null);
  const [editTitle, setEditTitle] = useState(item.title);
  const onFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onFocus.current) {
      onFocus.current.focus();
    }
  }, [currentItem]);

  const onBlur = () => {
    if (editTitle) {
      setCurrentItem(null);
      dispatch({ type: 'EDIT_TODO', payload: item.id, editTitle: editTitle });
    } else {
      dispatch({ type: 'EMPTY_TODO', payload: item.id });
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCurrentItem(null);
      dispatch({ type: 'EDIT_TODO', payload: item.id, editTitle: editTitle });
    } else if (e.key === 'Escape') {
      setCurrentItem(null);
      setEditTitle(item.title);
    }
  };

  return (
    <li
      className={cn({
        completed: item.completed,
        editing: currentItem?.id === item.id,
      })}
    >
      <div className="view">
        <input
          key={item.id}
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={item.completed}
          onChange={() =>
            dispatch({
              type: 'COMPLETE_TODO',
              payload: !item.completed,
              item: item.id,
            })
          }
        />
        <label onDoubleClick={() => setCurrentItem(item)}>{item.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => dispatch({ type: 'CLEAR_TODO', payload: item.id })}
        />
      </div>
      <input
        ref={onFocus}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        value={editTitle}
        onChange={e => setEditTitle(e.target.value)}
        type="text"
        className="edit"
      />
    </li>
  );
};
