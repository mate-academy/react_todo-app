import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Actions, DispatchContext, Keys } from '../Store';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const dispatch = useContext(DispatchContext);
  const { title, completed } = todo;
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputToogle = () => {
    dispatch({
      type: Actions.mark,
      todo,
    });
  };

  const deleteTodo = () => {
    dispatch({
      type: Actions.destroy,
      todo,
    });
  };

  const handleTodoEditKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === Keys.Escape) {
      setIsEditing(false);
    } else if (event.key === Keys.Enter) {
      dispatch({
        type: Actions.edit,
        todo: {
          ...todo,
          title: currentTitle,
        },
      });
      setIsEditing(false);
    }
  };

  const handleEditingInputBlur = () => {
    dispatch({
      type: Actions.edit,
      todo: {
        ...todo,
        title: currentTitle,
      },
    });
    setIsEditing(false);
  };

  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(event.target.value);
  };

  return (
    <li
      className={cn({
        completed,
        editing: isEditing,
      })}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleInputToogle}
          checked={completed}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Save"
          onClick={deleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={currentTitle}
        onChange={handleTodoChange}
        onKeyUp={handleTodoEditKey}
        onBlur={handleEditingInputBlur}
      />
    </li>
  );
};
