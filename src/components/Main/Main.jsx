import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Main = React.memo(
  ({ data, changeCheckob, onDelete, onUpdateTitle }) => {
    const [isCompleted, setCompleted] = useState(false);
    const [chhosenForEditing, setEdit] = useState(0);
    const [editValue, setEditValue] = useState('');

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

Main.propTypes = PropTypes.shape({
  data: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    title: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
  changeCheckob: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateTitle: PropTypes.func.isRequired,
}).isRequired;
