import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Context } from '../common/Context';

export const TodoItem = ({ isCompleted, id, title }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { setTodoCompleted, removeTodo, editTitle } = useContext(Context);
  const { register, getValues, handleSubmit } = useForm();

  const handleChange = (event) => {
    setTodoCompleted(id, event.target.checked);
  };

  const destroy = () => {
    removeTodo(id);
  };

  let currentClass = isCompleted ? 'completed' : '';

  if (isEditing) {
    currentClass = 'editing';
  }

  const onSubmit = (data) => {
    if (data.changedTitle) {
      editTitle(id, data.changedTitle);
    }

    setIsEditing(false);
  };

  document.addEventListener('click', function setInput(event) {
    if (event.target.dataset.area !== 'editTitle' && isEditing) {
      onSubmit(getValues());
      setIsEditing(false);
    }

    document.removeEventListener('click', setInput);
  });

  const onKeyUp = (event) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <li className={currentClass}>
      <div>
        <input
          type="checkbox"
          className="toggle"
          id={id}
          onChange={handleChange}
          checked={isCompleted}
        />
        {
          isEditing
            ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  name="changedTitle"
                  ref={(input) => {
                    input && input.focus();
                    register()(input);
                  }}
                  defaultValue={title}
                  type="text"
                  className="edit"
                  data-area="editTitle"
                  onKeyUp={onKeyUp}
                />
              </form>
            )
            : (
              <>
                <span
                  className="title"
                  onDoubleClick={() => setIsEditing(true)}
                >
                  {title}
                </span>
                <button
                  type="button"
                  className="destroy"
                  onClick={destroy}
                />
              </>
            )
        }
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
