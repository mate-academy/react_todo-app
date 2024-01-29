/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { DispatchContext, StateContext } from '../Store';
import { Todo } from '../utils/interfaces';
import { ActionType } from '../utils/enums';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [inputValue, setInputValue] = useState(todo.title);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      dispatch({
        type: ActionType.Edit,
        payload: { todo, title: inputValue },
      });

      setInputValue('');
    } else if (event.key === 'Enter' && inputValue.trim() === '') {
      dispatch({ type: ActionType.Delete, payload: todo.id });
    } else if (event.key === 'Escape') {
      setInputValue('');
      dispatch({ type: ActionType.CancelEdit });
    }
  };

  const handleOnEdit = () => {
    dispatch({ type: ActionType.OnEdit, payload: todo.id });
  };

  const handleDelete = () => {
    dispatch({ type: ActionType.Delete, payload: todo.id });
  };

  const handleCheck = () => {
    dispatch({ type: ActionType.Completed, payload: todo });
  };

  useEffect(() => {
    if (state.todoEdit === todo.id && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.todoEdit, todo.id]);

  return (
    <li className={classNames('',
      {
        completed: todo.completed,
        editing: state.todoEdit,
      })}
    >
      {state.todoEdit === todo.id
        ? (
          <input
            type="text"
            className="edit"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            ref={inputRef}
          />
        )
        : (
          <div className="view" onDoubleClick={handleOnEdit}>
            <input
              type="checkbox"
              className="toggle"
              id={todo.id.toString()}
              checked={todo.completed && true}
              onChange={handleCheck}
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
