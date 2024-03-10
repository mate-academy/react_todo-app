import { useContext, useState } from 'react';
import { Todos } from '../../types/types';
import { TodosContext } from '../../TodosContext';

type PropsItem = {
  todo: Todos;
};

export const TodoItem: React.FC<PropsItem> = ({ todo }) => {
  const [listInput, setListInput] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const { handleCompleted } = useContext(TodosContext);

  const { id, title, completed } = todo;

  const handleClickInput = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    setListInput(true);
  };

  const handleDelete = () => {
    setDeleted(true);
  };

  if (deleted) {
    return null;
  }

  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view" onDoubleClick={handleClickInput}>
        <input
          type="checkbox"
          className="toggle"
          id={id.toString()}
          checked={completed}
          onClick={() => handleCompleted(id)}
        />
        <label htmlFor="toggle-editing">{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Close"
          onClick={handleDelete}
        />
      </div>
      {listInput && <input type="text" className="edit" defaultValue={title} />}
    </li>
  );
};
