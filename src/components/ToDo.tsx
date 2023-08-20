/* eslint-disable */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ToDo } from '../types/ToDo';
import { DispatchContext } from '../ToDoContext';
import classNames from 'classnames';
// import { debounce } from 'lodash';

type Props = {
  toDo: ToDo,
}

export const ToDoItem: React.FC<Props> = ({ toDo }) => {
  const dispatch = useContext(DispatchContext);
  const editingLi: React.RefObject<HTMLInputElement> = useRef(null);
  const [editingtoDo, setEditingToDo] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [editingtoDoData, setEditingToDoData] = useState({} as ToDo);

  const handleClick = useCallback(() => {
    dispatch({ type: 'completed', payload: toDo.id });
    setRerender(!rerender);
  },[rerender])

  function handleDoubleClickEdit(e: React.MouseEvent) {
    // e.preventDefault()
    if (e.detail === 2) {
      e.preventDefault()
      setEditingToDo(true);
      setEditingToDoData(toDo);
    }
  }
  useEffect(() => {
    if (editingLi.current) {
      editingLi.current.focus();
    }
  })

  const handleEditChanges = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingToDoData(state => ({
      ...state,
      title: event.target.value,
    }))
  }, []);

  const handleEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // e.preventDefault()
    // debugger
    if (e.nativeEvent.code === 'Enter') {
      // e.preventDefault()
      if (e.target.value.split('').every(element => element === ' ')) {
        dispatch({ type: 'removePost', payload: editingtoDoData });
        setEditingToDo(false)
      } else {
        // e.preventDefault()
        dispatch({ type: 'updatePost', payload: editingtoDoData });
        setEditingToDo(false)
      }
    }
  }, [editingtoDoData.title]);

  function onBlurHelper() {
    dispatch({ type: 'updatePost', payload: editingtoDoData });
    setEditingToDo(false);
  }

  function handlerRemove() {
    dispatch({ type: 'removePost', payload: toDo });
  }

  return (
    <li
    key={toDo.id}
      className={classNames({
        'editing': editingtoDo,
        'completed': toDo.completed,
      })}


    >
      <div className="view" key={toDo.id}>
        <input
          type="checkbox"
          className="toggle"
          id={String(toDo.id)}
          checked={toDo.completed === true ? true : false}
          onChange={handleClick}

        />
        <label
          // htmlFor={String(toDo.id)}
          onClick={(e) => handleDoubleClickEdit(e)}
        >{
        toDo.title}
        </label>
        <button
          type="button"
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
  )
}
