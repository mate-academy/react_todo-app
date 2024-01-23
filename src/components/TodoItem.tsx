/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../Store';
import { Todo } from '../utils/interface';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      dispatch({
        type: 'edit',
        payload: { todo, title: inputValue },
      });

      setInputValue('');
    } else if (event.key === 'Escape') {
      setInputValue('');
      dispatch({ type: 'cancelEdit' });
    }
  };

  const handleOnEdit = () => {
    dispatch({ type: 'onEdit', payload: todo.id });
  };

  const handleDelete = () => {
    dispatch({ type: 'delete', payload: todo.id });
  };

  const handleCheck = () => {
    dispatch({ type: 'complited', payload: todo });
  };

  return (
    <li className={classNames('', { completed: todo.completed })}>
      {state.todoEdit === todo.id
        ? (
          <input
            type="text"
            className="edit"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        )
        : (
          <div className="view" onDoubleClick={handleOnEdit}>
            <input
              type="checkbox"
              className="toggle"
              id={todo.id.toString()}
              onClick={handleCheck}
            />
            <label htmlFor={todo.id.toString()}>{todo.title}</label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={handleDelete}
            />
          </div>
        )}

    </li>
  );
};
