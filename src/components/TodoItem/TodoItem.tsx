import React, { KeyboardEvent, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../CustomReducer/useCustomReducer';
import { Values } from '../Types/Values';

interface Props {
  item: Todo;
  data: Values;
}

export const TodoItem: React.FC<Props> = ({ item, data }) => {
  const { addCompleted, remove, changeInput } = data;
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
      className={classNames({ completed: item.completed, aditing: isActive })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => addCompleted(item.id)}
          checked={item.completed}
        />
        <label onDoubleClick={handleDoubleClick}>{mainTitle}</label>
        {/* <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => remove(item.id)}
        /> */}
      </div>
      {isActive && (
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
