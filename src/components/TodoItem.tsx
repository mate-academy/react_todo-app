/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { DispatchContext } from '../app/store';

type Props = {
  item: Todo;
};

const TodoItem: React.FC<Props> = ({ item }) => {
  const { id, title, completed } = item;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const dispatch = useContext(DispatchContext);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handleCheckboxChange = () => {
    dispatch({ type: 'setCompleted', payload: id });
  };

  const handleDeleteToDo = () => {
    dispatch({ type: 'deleteTodo', payload: id });
  };

  const handlerDoubleClick = () => {
    setIsEditing(true);
  };

  const handleAddNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleEditTitle = () => {
    if (newTitle) {
      dispatch({
        type: 'editTitle',
        payload: {
          title: newTitle.trim(),
          id,
          completed,
        },
      });
      setIsEditing(false);
    } else {
      handleDeleteToDo();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      handleEditTitle();
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', 'item-enter-done', {
        completed: completed,
      })}
      key={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={item.completed}
          //onClick={() => toggleTodoStatus(todo.id, !todo.completed)}
          onChange={handleCheckboxChange}
        />
      </label>

      {/*<label htmlFor="toggle-view" onDoubleClick={handlerDoubleClick}>
        {item.title}
      </label>*/}

      {isEditing ? (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          //value={editedTitle}
          //onChange={event => setEditedTitle(event.target.value)}
          //onBlur={handleBlur}
          //onKeyDown={handleKeyboardDown}
          value={newTitle}
          onChange={handleAddNewTitle}
          onKeyUp={handleKeyUp}
          onBlur={handleEditTitle}
          ref={titleField}
          //autoFocus
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handlerDoubleClick}
          >
            {item.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            disabled={isEditing}
            onClick={() => handleDeleteToDo()}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
