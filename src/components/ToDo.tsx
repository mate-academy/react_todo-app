import React, {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { ToDo } from '../types/ToDo';
import { ACTIONS, DispatchContext } from '../ToDoContext';

type Props = {
  toDo: ToDo,
};

export const ToDoItem: React.FC<Props> = ({ toDo }) => {
  const dispatch = useContext(DispatchContext);
  const editingLi: React.RefObject<HTMLInputElement> = useRef(null);
  const [editingtoDo, setEditingToDo] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [editingtoDoData, setEditingToDoData] = useState({} as ToDo);

  const handleClick = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE, payload: toDo.id });
    setRerender(!rerender);
  }, [rerender]);

  function handleDoubleClickEdit(e: React.MouseEvent) {
    if (e.detail === 2) {
      e.preventDefault();
      setEditingToDo(true);
      setEditingToDoData(toDo);
    }
  }

  useEffect(() => {
    if (editingLi.current) {
      editingLi.current.focus();
    }
  });

  const handleEditChanges = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditingToDoData(state => ({
      ...state,
      title: event.target.value,
    }));
  }, []);

  const handleEnter = useCallback((
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.nativeEvent.code === 'Enter') {
      if (e.target.value.split('').every(element => element === ' ')) {
        dispatch({ type: ACTIONS.REMOVE, payload: editingtoDoData });
        setEditingToDo(false);
      } else {
        dispatch({ type: ACTIONS.UPDATE, payload: editingtoDoData });
        setEditingToDo(false);
      }
    }
  }, [editingtoDoData.title]);

  function onBlurHelper() {
    dispatch({ type: ACTIONS.UPDATE, payload: editingtoDoData });
    setEditingToDo(false);
  }

  function handlerRemove() {
    dispatch({ type: ACTIONS.REMOVE, payload: toDo });
  }

  return (
    <li
      key={toDo.id}
      className={classNames({
        editing: editingtoDo,
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
          onClick={(e) => handleDoubleClickEdit(e)}
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
        value={editingtoDoData.title || ''}
        onChange={(event) => handleEditChanges(event)}
        ref={editingLi}
        onKeyDown={handleEnter}
        onBlur={onBlurHelper}
      />
    </li>
  );
};
