/* eslint-disable */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ToDo } from '../types/ToDo';
import { DispatchContext } from '../ToDoContext';
import classNames from 'classnames';

type Props = {
  toDo: ToDo,
}

export const ToDoItem: React.FC<Props> = ({ toDo }) => {
  const dispatch = useContext(DispatchContext);
  const editingLi: React.RefObject<HTMLInputElement> = useRef(null);
  const [editingtoDo, setEditingToDo] = useState(false);
  const [editingtoDoData, setEditingToDoData] = useState({} as ToDo);

  const handleClick = useCallback(() => dispatch({ type: 'completed', payload: toDo.id }), []);

  function handleDoubleClickEdit(e: React.MouseEvent) {
    e.preventDefault()
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

  console.log(editingtoDoData.title)
  const handleEditChanges = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value.split('').every(element => element === ' '));

    setEditingToDoData(state => ({
    ...state,
    title: event.target.value,
  }))}, [editingtoDoData]);

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    // e.preventDefault();
    if (e.nativeEvent.code === 'Enter') {
      if (e.target.value.split('').every(element => element === ' ')) {
        dispatch({ type: 'removePost', payload: editingtoDoData });
        setEditingToDo(false)
      } else {
        dispatch({ type: 'updatePost', payload: editingtoDoData });
        setEditingToDo(false)
      }


    }
    // setEditingToDoData(state => ({
    //   ...state,
    //   title: e.target.value,
    // }))
  }

  // const handleOnBlur = useCallback(debounce(setFocused, 100), []);
  return (
    <li
      className={classNames({
        'editing': editingtoDo,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleClick}
        />
        <label htmlFor="toggle-view">{toDo.title}</label>
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
        onChange={(event) =>  handleEditChanges(event)}
        ref={editingLi}
        onKeyDown={handleEnter}
        onClick={(e) => handleDoubleClickEdit(e)}
      />
    </li>
  )
}
