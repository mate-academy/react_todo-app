import React, {
  useState, useRef, useEffect,
} from 'react';
import classNames from 'classnames';
import { useTodo } from '../../hooks/useTodo';

type Props = {
  id: number;
  title: string;
  completed: boolean;
};

export const TodoItem: React.FC<Props> = ({
  id,
  title,
  completed,
}) => {
  const {
    items,
    setItems,
    deleteItem,
  } = useTodo();

  const [isEditableInput, setIsEditableInput] = useState(false);
  const [editebleInputValue, setEditebleInputValue] = useState(title);

  const editebleInput = useRef<HTMLInputElement>(null);

  const editItem = (itemId: number) => {
    const newValue = editebleInputValue.trim();

    if (!newValue) {
      deleteItem(itemId);
    }

    if (newValue && newValue !== title) {
      const newItems = [...items];
      const currentItem = newItems.find(item => item.id === itemId);

      if (currentItem) {
        currentItem.title = newValue;
      }

      setItems(newItems);
    }

    setIsEditableInput(false);
  };

  const handleCheckboxChange = () => {
    const newItems = [...items];
    const currentItem = newItems.find(item => item.id === id);

    if (currentItem) {
      currentItem.completed = !currentItem.completed;
    }

    setItems(newItems);
  };

  const handleDoubleClickLabel = () => {
    setIsEditableInput(true);
  };

  const handleEditableInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditebleInputValue(event.target.value);
  };

  const handleEditableInputBlur = () => {
    editItem(id);
  };

  const handleEditableInputPressKey = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== 'Enter' && event.key !== 'Escape') {
      return;
    }

    event.preventDefault();

    if (event.key === 'Enter') {
      editItem(id);
    }

    if (event.key === 'Escape') {
      setEditebleInputValue(title);
      setIsEditableInput(false);
    }
  };

  useEffect(() => {
    if (editebleInput.current && isEditableInput) {
      editebleInput.current.focus();
    }
  }, [isEditableInput]);

  return (
    <li
      className={classNames({ completed, editing: isEditableInput })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <label
          onDoubleClick={handleDoubleClickLabel}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="delete this Todo"
          onClick={() => deleteItem(id)}
        />
      </div>
      {isEditableInput && (
        <input
          type="text"
          className="edit"
          ref={editebleInput}
          value={editebleInputValue}
          onChange={handleEditableInputChange}
          onBlur={handleEditableInputBlur}
          onKeyUp={handleEditableInputPressKey}
        />
      )}
    </li>
  );
};
