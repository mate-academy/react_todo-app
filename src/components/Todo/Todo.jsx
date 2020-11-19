import React, { useState } from 'react';
import cn from 'classnames';

export const Todo = ({ item, renameTitle, deleteTodo, checkTodo }) => {
  const [itemTitle, setItemTitle] = useState(item.title);
  const [isEditing, setIsEditing] = useState(false);

  const titleChangeHandler = (event) => {
    setItemTitle(event.target.value);
  }

  const saveTitle = (event) => {
    if(event.key === 'Enter') {
      setItemTitle(event.target.value);
      renameTitle(item, itemTitle);
      setIsEditing(!isEditing);
    }
  }


  return (
    <li className={cn({
      'completed': item.completed,
      'editing': isEditing,
    })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onClick={()=>checkTodo(item)}
        />
        <label
          onDoubleClick={()=>setIsEditing(!isEditing)}
        >
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={()=>deleteTodo(item)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={itemTitle}
        onChange={titleChangeHandler}
        onKeyDown={saveTitle}
      />
    </li>
  )
}