import React, { useRef, useState } from 'react';
import Todo from '../../types/Todo';
import CloseButton from '../UI/CloseButton';

interface Props {
  todo: Todo,
}

const TodoItem: React.FC<Props> = ({
  todo: {
    id,
    title,
    completed,
  },
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const editingInput = useRef<HTMLInputElement | null>(null);

  const completedClass = completed && 'completed';
  const editingClass = isEditing && 'editing';

  const handleDouble = () => {
    setIsEditing(true);
    if (editingInput.current) {
      editingInput.current.focus();
    }

    // console.log('Double: ', document.activeElement);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // console.log('Blur: ', document.activeElement);
  };

  // console.log(`${editingClass || completedClass || ''}`);

  return (
    <li
      className={`${editingClass || completedClass}`}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${id}`}
        />

        <label
          htmlFor={`todo-${id}`}
          onDoubleClick={handleDouble}
        // onBlur={handleBlur}
        >
          {title}
        </label>

        <CloseButton />
      </div>

      <input
        type="text"
        className="edit"
        ref={editingInput}
        onBlur={handleBlur}
      />
    </li>
  );
};

export default TodoItem;
