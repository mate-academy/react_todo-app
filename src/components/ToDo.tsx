/* eslint-disable */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ToDo } from '../types/ToDo';
import { DispatchContext } from '../ToDoContext';
import classNames from 'classnames';
import { debounce } from 'lodash';

type Props = {
  toDo: ToDo,
}

export const ToDoItem: React.FC<Props> = ({ toDo }) => {
  const dispatch = useContext(DispatchContext);
  const editingLi: React.RefObject<HTMLInputElement> = useRef(null);
  const [editingtoDo, setEditingToDo] = useState(false);
  const [editingtoDoData, setEditingToDoData] = useState({} as ToDo);

  const handleClick = useCallback(debounce(() => dispatch({ type: 'completed', payload: toDo.id }), 300), [editingtoDo]);

  function handleDoubleClickEdit(e: React.MouseEvent) {
    if (e.detail === 2) {
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
  }, [toDo]);

  // function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
  //   if (e.nativeEvent.code === 'Enter') {
  //     if (e.target.value.split('').every(element => element === ' ')) {
  //       dispatch({ type: 'removePost', payload: editingtoDoData });
  //       setEditingToDo(false)
  //     } else {
  //       dispatch({ type: 'updatePost', payload: editingtoDoData });
  //       setEditingToDo(false)
  //     }
  //   }
  // }

  const handleEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.code === 'Enter') {
          if (e.target.value.split('').every(element => element === ' ')) {
            dispatch({ type: 'removePost', payload: editingtoDoData });
            setEditingToDo(false)
          } else {
            dispatch({ type: 'updatePost', payload: editingtoDoData });
            setEditingToDo(false)
          }
        }
  }, [editingtoDoData.title]);

  function onBlurHelper() {
    dispatch({ type: 'updatePost', payload: editingtoDoData });
    setEditingToDo(false);
  }

  return (
    <li
      className={classNames({
        'editing': editingtoDo,
        'completed': toDo.completed,
      })}
      onClick={(e) => handleDoubleClickEdit(e)}

    >
      <div className="view" key={toDo.id}>
        <input
          type="checkbox"
          className="toggle"
          id={String(toDo.id)}
          checked={toDo.completed === true ? true : false}
          onChange={handleClick}
        />
        <label htmlFor={String(toDo.id)}
          key={toDo.id}
        >{toDo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"

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
