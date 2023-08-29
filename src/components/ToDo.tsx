import React, {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { ToDo } from '../types/ToDo';
import {
  ACTIONS,
  StateContext,
} from '../ToDoContext';

type Props = {
  toDo: ToDo,
};

export const ToDoItem: React.FC<Props> = ({ toDo }) => {
  const [, dispatch] = useContext(StateContext);
  const editingLi: React.RefObject<HTMLInputElement> = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingtoDoData, setEditingToDoData] = useState('');

  const handleClick = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE, payload: toDo.id });
  }, [toDo.id]);

  function handleDoubleClickEdit(e: React.MouseEvent) {
    e.preventDefault();
    setIsEditing(true);
    setEditingToDoData(toDo.title);
  }

  useEffect(() => {
    if (editingLi.current) {
      editingLi.current.focus();
    }
  });

  const handleEditChanges = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditingToDoData(event.currentTarget.value);
  }, []);

  const handleEnter = useCallback((
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.nativeEvent.code === 'Enter') {
      if (e.target.value.split('').every(element => element === ' ')) {
        dispatch({ type: ACTIONS.REMOVE, payload: toDo });
        setIsEditing(false);
      } else {
        dispatch({
          type:
            ACTIONS.UPDATE,
          payload: {
            id: toDo.id,
            title: editingtoDoData,
            completed: toDo.completed,
          } as ToDo,
        });
        setIsEditing(false);
      }
    }
  }, [editingtoDoData]);

  function handleBlur() {
    dispatch({
      type:
        ACTIONS.UPDATE,
      payload: {
        id: toDo.id,
        title: editingtoDoData,
        completed: toDo.completed,
      } as ToDo,
    });
    setIsEditing(false);
  }

  function handlerRemove() {
    dispatch({ type: ACTIONS.REMOVE, payload: toDo });
  }

  return (
    <li
      key={toDo.id}
      className={classNames({
        editing: isEditing,
        completed: toDo.completed,
      })}
    >
      <div className="view" key={toDo.id}>
        <input
          type="checkbox"
          className="toggle"
          id={String(toDo.id)}
          checked={toDo.completed}
          onChange={handleClick}

        />
        <label
          onDoubleClick={(e) => handleDoubleClickEdit(e)}
          aria-hidden="true"
        >
          {toDo.title}
        </label>
        <button
          type="button"
          aria-label="destroy"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handlerRemove}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editingtoDoData || ''}
        onChange={handleEditChanges}
        ref={editingLi}
        onKeyDown={handleEnter}
        onBlur={handleBlur}
      />
    </li>
  );
};
