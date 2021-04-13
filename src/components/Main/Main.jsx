import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

export const Main = React.memo(
  ({ data, changeCheckob, onDelete, onUpdateTitle }) => {
    const [isCompleted, setCompleted] = useState(false);
    const [chhosenForEditing, setEdit] = useState(0);
    const [editValue, setEditValue] = useState('');

    console.log('edit:', editValue);

    return (
      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">

          {data.map(item => (

            <li
              className={classnames('',
                { completed: item.completed },
                { editing: chhosenForEditing === item.id })}
              key={item.id}
              onDoubleClick={() => {
                setEdit(item.id);
                setEditValue(item.title);
              }}
            >
              <div className="view">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={item.completed}
                  onClick={() => {
                    setCompleted(!isCompleted);
                    changeCheckob(item.id, isCompleted);
                  }}
                />
                <label>{item.title}</label>
                <button
                  type="button"
                  className="destroy"
                  onClick={() => {
                    onDelete(item.id);
                  }}
                />
              </div>

              <input
                type="text"
                className="edit"
                value={editValue}
                onChange={(event) => {
                  setEditValue(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    onUpdateTitle(chhosenForEditing, event.target.value);
                    setEdit(null);
                  }

                  if (event.key === 'Escape') {
                    setEdit(null);
                  }
                }}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  },
);

// <li className="editing">
//   <div className="view">
//     <input type="checkbox" className="toggle" />
//     <label>zxcvbnm</label>
//     <button type="button" className="destroy" />
//   </div>
//   <input type="text" className="edit" />
// </li>

// <li>
//   <div className="view">
//     <input type="checkbox" className="toggle" />
//     <label>1234567890</label>
//     <button type="button" className="destroy" />
//   </div>
//   <input type="text" className="edit" />
// </li> */
