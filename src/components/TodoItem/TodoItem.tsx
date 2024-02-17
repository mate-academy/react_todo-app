import classNames from 'classnames';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../contexts/StateContext';
import { ActionTypes } from '../../types/Actions';

type Props = {
  data: Todo,
};

export const TodoItem: React.FC<Props> = ({ data }) => {
  const { id, completed, title } = data;

  const dispatch = useContext(DispatchContext);

  const [newTitle, setNewTitle] = useState(title);
  const [isEditingMode, setIsEditingMode] = useState(false);

  const input = useRef<HTMLInputElement>(null);

  const toggleStatus = (targetId: number) => {
    dispatch({ type: ActionTypes.ToggleStatus, payload: targetId });
  };

  const deleteTodo = (targetId: number) => {
    dispatch({ type: ActionTypes.DeleteTodo, payload: targetId });
  };

  const onTitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const saveEdit = () => {
    if (newTitle.trim() && title !== newTitle) {
      dispatch({
        type: ActionTypes.UpdateTodo,
        payload: { id, title: newTitle, completed },
      });
    } else {
      deleteTodo(id);
    }

    setIsEditingMode(false);
  };

  const onKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveEdit();
    }

    if (event.key === 'Escape') {
      setIsEditingMode(false);
      setNewTitle(title);
    }
  };

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [isEditingMode]);

  return (
    <li className={classNames(
      { completed, editing: isEditingMode },
    )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={() => toggleStatus(id)}
        />
        <label
          onDoubleClick={() => setIsEditingMode(true)}
        >
          {title}
        </label>

        <button
          aria-label="toggle-view"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>

      {!!isEditingMode && (
        <input
          type="text"
          className="edit"
          value={newTitle}
          ref={input}
          onBlur={saveEdit}
          onChange={onTitleChangeHandler}
          onKeyUp={onKeyHandler}
        />
      )}
    </li>
  );
};
