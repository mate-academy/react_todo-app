import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Todos } from '../../types/types';
import { TodosContext } from '../../TodosContext';

type PropsItem = {
  todo: Todos;
};

export const TodoItem: React.FC<PropsItem> = ({ todo }) => {
  const [listInput, setListInput] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [editedText, setEditedText] = useState('');
  const { handleCompleted } = useContext(TodosContext);

  const { id, title, completed } = todo;

  const handleClickInput = (event: React.MouseEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setListInput(true);
    setEditedText(title);
  };

  const handleDelete = () => {
    setDeleted(true);
  };

  if (deleted) {
    return null;
  }

  const enterInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      setListInput(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };

  const handleEdit = () => {
    setEditedText(title);
    setListInput(false);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: listInput,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id.toString()}
          checked={completed}
          onClick={() => handleCompleted(id)}
        />
        <label htmlFor="toggle-editing" onDoubleClick={handleClickInput}>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Close"
          onClick={handleDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedText}
        onKeyDown={enterInput}
        onBlur={handleEdit}
        onChange={handleChange}
      />
    </li>
  );
};
