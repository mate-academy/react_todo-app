import React, { useState } from 'react';
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

  let className = '';

  if (isEditing) {
    className = 'editing';
  } else if (completed) {
    className = 'completed';
  }

  const handleDouble = () => {
    setIsEditing(true);
    // console.log('Double: ', document.activeElement);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // console.log('Blur: ', document.activeElement);
  };

  return (
    <li
      className={className}
      onDoubleClick={handleDouble}
      onBlur={handleBlur}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${id}`}
        />

        <label htmlFor={`todo-${id}`}>{title}</label>

        <CloseButton />
      </div>

      {isEditing && (
        <input
          type="text"
          className="edit"
        />
      )}
    </li>
  );
};

export default TodoItem;
