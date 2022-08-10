/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import {
  CHECK_TODO,
  COUNT_OF_ACTIVE,
  DELETE_TODO,
  EDIT_TODO,
} from './store/todosReducer';
import { Todo } from './type';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC <Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const [editTodo, setEditTodo] = useState('');
  const [editedText, setEditedText] = useState('');

  return (
    <li
      key={todo.id}
      onDoubleClick={() => {
        setEditTodo(todo.id);
      }}
      className={classNames({
        completed: todo.completed,
        editing: editTodo === todo.id,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={todo.id}
          checked={todo.completed}
          onChange={() => {
            dispatch({ type: CHECK_TODO, payload: todo.id });
            dispatch({ type: COUNT_OF_ACTIVE });
          }}
        />
        <label
          htmlFor={todo.id}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            dispatch({ type: DELETE_TODO, payload: todo.id });
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedText}
        onChange={(event) => {
          setEditedText(event.target.value);
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            if (editedText === '') {
              dispatch({ type: DELETE_TODO, payload: todo.id });
              setEditTodo('');
            }

            dispatch(
              { type: EDIT_TODO, payload: { id: todo.id, title: editedText } },
            );
            setEditedText('');
            setEditTodo('');
          }

          if (event.key === 'Escape') {
            setEditedText('');
          }
        }}
      />
    </li>
  );
};
