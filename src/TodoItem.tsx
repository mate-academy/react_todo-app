import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from './type/Todo';
import { DispatchContext } from './Store';

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
    if (newTitle.trim()) {
      dispatch({
        type: 'editTitle',
        payload: {
          title: newTitle,
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
    <li
      key={id}
      className={
        classNames(
          {
            completed,
            editing: isEditing,
          },
        )
      }
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={item.completed}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={handlerDoubleClick}
        >
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteToDo}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={handleAddNewTitle}
        onKeyUp={handleKeyUp}
        onBlur={handleEditTitle}
        ref={titleField}
      />
    </li>
  );
};

export default TodoItem;
