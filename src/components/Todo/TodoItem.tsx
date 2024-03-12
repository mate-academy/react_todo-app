/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../Store';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useContext(TodosContext);

  const handleToggleTodoChange = () => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
  };

  return (
    <li>
      <div className={todo.completed ? 'completed' : 'view'}>
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${todo.id}`}
          checked={todo.completed}
          onChange={handleToggleTodoChange}
        />
        <label htmlFor={`toggle-${todo.id}`}>{todo.title}</label>
        <button type="button" className="destroy" data-cy="deleteTodo" />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
