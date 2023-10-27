/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';
import cn from 'classnames';
import { TodosContext } from '../../store/store';
import { Todo } from '../../types/Todo';
import { Dispatchers } from '../../types/enums/Dispatchers';

interface Props {
  todo: Todo,
  toggleStatus: (id: number) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, toggleStatus }) => {
  const { dispatch } = useContext(TodosContext);
  const [titleCurrent, setTitleCurrent] = useState('');
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [isEdited, setIsEdited] = useState(false);
  const [status, setStatus] = useState(false);
  const checkbox = useRef<HTMLInputElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const { title, completed, id } = todo;

  const handleDeleteTodo = (todoId: number) => {
    dispatch({ type: Dispatchers.DeleteWithId, payload: todoId });
  };

  const handleTitleUpdate = () => {
    setIsEdited(false);

    if (!updatedTitle.trim()) {
      handleDeleteTodo(id);
    }

    dispatch({
      type: Dispatchers.UpdateTitle,
      payload: {
        ...todo,
        title: updatedTitle,
      },
    });
  };

  const onKeysHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      handleTitleUpdate();
    }

    if (event.key === 'Escape') {
      setIsEdited(false);
      setUpdatedTitle(titleCurrent);
    }
  };

  const onSetEdited = () => {
    setIsEdited(true);
    setTimeout(() => {
      input.current?.focus();
    }, 1);
  };

  useEffect(() => {
    setTitleCurrent(title);
    setUpdatedTitle(title);
    setStatus(completed);

    if (completed && checkbox.current) {
      checkbox.current.checked = true;
    }

    if (!completed && checkbox.current) {
      checkbox.current.checked = false;
    }
  }, [title, completed]);

  return (
    <li
      className={cn(
        { completed: status },
        { editing: isEdited },
      )}
      onDoubleClick={onSetEdited}
    >
      <div className="view">
        <input
          ref={checkbox}
          type="checkbox"
          onClick={() => toggleStatus(id)}
          onBlur={() => setIsEdited(false)}
          className="toggle"
          id={String(id)}
        />
        <label>
          {titleCurrent}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeleteTodo(id)}
        />
      </div>
      <input
        type="text"
        value={updatedTitle}
        onChange={(event) => setUpdatedTitle(event.target.value)}
        className="edit"
        onBlur={handleTitleUpdate}
        ref={input}
        onKeyUp={onKeysHandler}
      />
    </li>
  );
};
