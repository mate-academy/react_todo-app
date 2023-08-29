/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useReducer } from 'react';
// import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext, initialTodos, reducer } from '../../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [dispatch] = useReducer(reducer, initialTodos);
  const { title, completed, id } = todo;
  // const { dispatch } = useContext(TodoContext);

  const deleteTodo = () => {
    dispatch({
      type: 'deleteTodo', payload: id,
    });
  };

  return (
    <li>
      <div className="view">
        <input type="checkbox" className="toggle" id="toggle-view" />
        <label htmlFor="toggle-view">{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteTodo}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
