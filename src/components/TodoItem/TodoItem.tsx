/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { DispatchContext } from '../TodosContext';

type Props = {
  item: Todo,
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const dispatch = useContext(DispatchContext);

  const handleRemoveClick = () => dispatch({
    type: 'remove',
    payload: item.id,
  });

  const handleCompletedClick = () => dispatch({
    type: 'toggle',
    payload: item,
  });

  return (
    <li
      className={classNames({
        completed: item.completed,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={item.completed}
          onClick={handleCompletedClick}
        />
        <label htmlFor="toggle-view">{item.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleRemoveClick}
        />
      </div>
      <input type="text" className="edit" />
    </li>

  // <li className="completed">
  //   <div className="view">
  //     <input type="checkbox" className="toggle" id="toggle-completed" />
  //     <label htmlFor="toggle-completed">qwertyuio</label>
  //     <button type="button" className="destroy" data-cy="deleteTodo" />
  //   </div>
  //   <input type="text" className="edit" />
  // </li>

  // <li className="editing">
  //   <div className="view">
  //     <input type="checkbox" className="toggle" id="toggle-editing" />
  //     <label htmlFor="toggle-editing">zxcvbnm</label>
  //     <button type="button" className="destroy" data-cy="deleteTodo" />
  //   </div>
  //   <input type="text" className="edit" />
  // </li>

  // <li>
  //   <div className="view">
  //     <input type="checkbox" className="toggle" id="toggle-view2" />
  //     <label htmlFor="toggle-view2">1234567890</label>
  //     <button type="button" className="destroy" data-cy="deleteTodo" />
  //   </div>
  //   <input type="text" className="edit" />
  // </li>
  );
};
