/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import classNames from 'classnames';
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

  const handleDeleteTodo = () => {
    dispatch({ type: 'REMOVE_TODO', payload: todo.id });
  };

  return (
    <li className={classNames({ completed: todo.completed })}>
      <div className={todo.completed ? 'completed' : 'view'}>
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${todo.id}`}
          checked={todo.completed}
          onChange={handleToggleTodoChange}
        />
        <label htmlFor={`toggle-${todo.id}`}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
