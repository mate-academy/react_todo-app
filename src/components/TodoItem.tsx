import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { StateContext } from '../context/StateContext';
import { ActionTypes } from '../types/Action';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, completed, title },
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useContext(StateContext);

  const handleChangeStatus = () => {
    dispatch({ type: ActionTypes.CHANGE_STATUS, payload: id });
  };

  const handleDeleteTodo = () => {
    dispatch({ type: ActionTypes.REMOVE_TODO, payload: id });
  };

  const handleDoubleClick = () => {
    setOnFocus(true);
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setOnFocus(false);
    if (!newTitle.trim()) {
      dispatch({ type: ActionTypes.REMOVE_TODO, payload: id });

      return;
    }

    dispatch({ type: ActionTypes.EDIT_TODO, payload: { id, newTitle } });
  };

  const handleSubmitNewTitle = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Escape') {
      setOnFocus(false);
      setIsEditing(false);
      setNewTitle(title);
    }

    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  useEffect(() => {
    if (inputRef.current && onFocus) {
      inputRef.current.focus();
    }
  }, [onFocus]);

  return (
    <li className={cn({ completed }, { editing: isEditing })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleChangeStatus}
        />
        <label onDoubleClick={handleDoubleClick}>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputRef}
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
        onKeyUp={handleSubmitNewTitle}
        onBlur={handleBlur}
      />
    </li>
  );
};
