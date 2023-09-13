/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import classnames from 'classnames';
import { Todo } from '../../interfaces/Todo';
import { DispatchTodosContext } from '../../context/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem:React.FC<Props> = ({ todo }) => {
  const { completed, title, id } = todo;
  const dispatch = useContext(DispatchTodosContext);

  const editInput = useRef<HTMLInputElement>(null);

  const [editingTitle, setEditingTitle] = useState(title);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (editInput.current) {
      editInput.current.focus();
    }
  }, [isEdit]);

  const handleChangeCompletedStatus = () => {
    dispatch({ type: 'change completed status', todoId: id });
  };

  const handleDelete = () => {
    dispatch({ type: 'delete', todoId: id });
  };

  const handleEditing = () => {
    setIsEdit(true);
  };

  const saveChange = () => {
    if (!editingTitle.trim()) {
      dispatch({ type: 'delete', todoId: id });
    } else {
      dispatch({ type: 'change title', todoId: id, newTitle: editingTitle });
    }

    setIsEdit(false);
  };

  const handleEditingKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEdit(false);
    }

    if (event.key === 'Enter') {
      saveChange();
    }
  };

  const handleEditingBlur = () => {
    if (isEdit) {
      saveChange();
    }
  };

  const handleEditingChange
  = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setEditingTitle(event.target.value);
  };

  return (
    <li className={classnames({
      completed,
      editing: isEdit,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${id}`}
          onChange={handleChangeCompletedStatus}
          checked={completed}
        />

        <label
          onDoubleClick={handleEditing}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editingTitle}
        ref={editInput}
        onChange={handleEditingChange}
        onKeyUp={handleEditingKeyUp}
        onBlur={handleEditingBlur}
      />
    </li>
  );
};
