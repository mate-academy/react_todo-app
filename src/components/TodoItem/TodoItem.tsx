import cn from 'classnames';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../store/TodosContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    setTodos,
    handleCheckboxClick,
    handleDelete,
    findTodo,
  } = useContext(TodosContext);
  const { id, title, completed } = todo;

  const [newTitle, setNewTitle] = useState(title);
  const [isTodoClicked, setIsTodoClicked] = useState(false);

  const inputField = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setIsTodoClicked(true);
  };

  const handleNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const saveNewTitle = () => {
    setIsTodoClicked(false);

    if (!newTitle.trim()) {
      handleDelete(id);

      return;
    }

    if (newTitle === title) {
      return;
    }

    setTodos(findTodo(id, newTitle));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsTodoClicked(false);
    }

    if (event.key === 'Enter') {
      saveNewTitle();
    }
  };

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [isTodoClicked]);

  return (
    <li
      className={cn({
        completed,
        editing: isTodoClicked,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onClick={() => handleCheckboxClick(id, completed)}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDelete(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputField}
        value={newTitle}
        onChange={handleNewTitle}
        onBlur={saveNewTitle}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
