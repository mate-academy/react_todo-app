import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title /* , completed */ } = todo;

  return (
    <div>
      <li>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-view-${id}`}
            // onClick={}
          />
          <label htmlFor={`toggle-view-${id}`}>{title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="asdfghj"
          />
        </div>
        <input type="text" className="edit" />
      </li>

      {/*
  <li className="completed">
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={`toggle-completed-${id}`}
      />
      <label htmlFor={`toggle-completed-${id}`}>qwertyuio</label>
      <button
        type="button"
        className="destroy"
        data-cy="deleteTodo"
        aria-label="qwertyuio"
      />
    </div>
    <input type="text" className="edit" />
  </li>

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id={`toggle-editing-${id}`} />
          <label htmlFor={`toggle-editing-${id}`}>zxcvbnm</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="zxcvbnm"
          />
        </div>
        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">1234567890</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="1234567890"
          />
        </div>
        <input type="text" className="edit" />
      </li>
      */}

    </div>
  );
};

// <li></li>
// <label htmlFor={`toggle-view-${id}`}>{title}</label>

//  <li className="completed">
// <label htmlFor={`toggle-completed-${id}`}>qwertyuio</label>

//  <li className="editing">
// <label htmlFor={`toggle-editing-${id}`}>zxcvbnm</label>
