import React, { useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { DispatchContext } from './TodosContext/TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);

  const handleDeleteTodo = () => {
    dispatch({
      type: 'removeTodo',
      id: todo.id,
    });
  };

  return (
    <li className={classNames({
      completed: todo.completed,
    })}
    >
      <div className="view">
        <input type="checkbox" className="toggle" id="toggle-view" />
        <label>{todo.title}</label>
        {/* eslint-disable-next-line */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
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
  );
};
