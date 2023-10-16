/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo, ActionTypes } from '../types';
import { DispatchTodo } from '../context';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [query, setQuery] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useContext(DispatchTodo);
  const inputRef = useRef<HTMLInputElement>(null);
  const { id, title, completed } = todo;

  const changeTodoStatus = () => {
    dispatch({
      type: ActionTypes.CHANGE_TODO_STATUS,
      payloadId: id,
      payloadCompleted: !completed,
    });
  };

  const changeTodoTitle = () => {
    dispatch({
      type: ActionTypes.CHANGE_TODO_TITLE,
      payloadText: query,
      payloadId: id,
    });
  };

  const onDoubleClick = () => {
    setIsEdit(true);
    setQuery(title);
  };

  const onEscDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEdit(false);
      setQuery(title);
    }
  };

  const deleteTodos = () => {
    dispatch({ type: ActionTypes.DELETE_TODO, payload: id });
  };

  const onNewTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeTodoTitle();

    if (query === '') {
      deleteTodos();
    }

    if (query === title) {
      setIsEdit(false);
      setQuery(title);
    }

    setQuery(query);
    setIsEdit(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <li
      className={classNames({
        editing: isEdit,
        completed,
      })}
    >
      {isEdit ? (
        <form
          onSubmit={onNewTitle}
          onBlur={onNewTitle}
        >
          <input
            type="text"
            className="edit"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef}
            onKeyUp={onEscDown}
          />
        </form>
      ) : (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            onClick={changeTodoStatus}
            checked={completed}
          />
          <label
            onDoubleClick={onDoubleClick}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={deleteTodos}
          />
        </div>
      )}
    </li>
  );
};
