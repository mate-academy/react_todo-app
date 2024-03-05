import React, { KeyboardEvent, useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../CustomReducer/useCustomReducer';
import { MyContext } from '../Provider/Provider';

interface Props {
  item: Todo;
}

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { reducer } = useContext(MyContext)
  const { addCompleted, remove, changeInput } = reducer;
  const [isActive, setIsActive] = useState(false);
  const [mainTitle, setMainTitle] = useState(item.title);
  const oldTitle = item.title;
  const handleDoubleClick = () => {
    setIsActive(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainTitle(e.target.value);
  };

  const handleBlur = () => {
    const obj = {
      id: item.id,
      title: mainTitle,
      completed: item.completed,
    };

    setIsActive(false);
    if (mainTitle.trim() === '') {
      remove(item.id);
    }

    changeInput(obj);
  };

  const keyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    } else if (event.key === 'Escape') {
      setMainTitle(oldTitle);
      setIsActive(false);
    }
  };

  return (
    <li
      className={classNames({ completed: item.completed, editing: isActive })}
    >
      {/* eslint-disable jsx-a11y/control-has-associated-label */}
      {!isActive ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            onChange={() => addCompleted(item.id)}
            checked={item.completed}
          />
          <label onDoubleClick={handleDoubleClick}>{mainTitle}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => remove(item.id)}
          />
        </div>
      ) : (
        <input
          type="text"
          className="edit"
          value={mainTitle}
          onChange={handleChange}
          onKeyUp={keyHandler}
          onBlur={handleBlur}
        />
      )}
    </li>
  );
};
