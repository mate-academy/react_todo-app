import cn from 'classnames';
import { useContext, useState } from 'react';
import { TodoItem as TodoItemType } from '../../types/TodoItem';
import { AllActions } from '../../types/Action';
import { GlobalContextController } from '../GlobalStateProvider';

type Props = {
  todo: TodoItemType,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, dispatch } = useContext(GlobalContextController);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [updatedName, setUpdatedName] = useState(todo.title);

  const handleChange = (id: number) => {
    const searched = todos.find(item => item.id === id);

    if (searched) {
      searched.completed = !searched.completed;
      dispatch({ type: AllActions.Update, payload: id, value: searched });
    }
  };

  const handleDelete = () => {
    dispatch({ type: AllActions.Remove, payload: todo.id });
  };

  const handleKeyDown
    = (event: React.KeyboardEvent, updated: TodoItemType) => {
      if (event.key === 'Enter') {
        if (updatedName.trim() !== '') {
          const updatedCopy = { ...updated, title: updatedName.trim() };

          dispatch(
            {
              type: AllActions.Update, payload: updated.id, value: updatedCopy,
            },
          );

          setIsEditingMode(false);
        } else {
          dispatch({
            type: AllActions.Remove, payload: todo.id,
          });
        }
      } else if (event.key === 'Escape') {
        setUpdatedName(updated.title);
        setIsEditingMode(false);
      }
    };

  const handleOnBlur = (updated: TodoItemType) => {
    if (!updatedName.trim()) {
      setUpdatedName(updated.title);
      setIsEditingMode(false);

      return;
    }

    const updatedCopy = { ...updated, title: updatedName.trim() };

    dispatch(
      { type: AllActions.Update, payload: updated.id, value: updatedCopy },
    );
    setIsEditingMode(false);
  };

  return (
    <li
      key={todo.id}
      className={cn({ completed: todo.completed, editing: isEditingMode })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view${todo.id}`}
          checked={todo.completed}
          onChange={() => handleChange(todo.id)}
        />

        <label
          htmlFor="toggle-view"
          onDoubleClick={() => {
            setIsEditingMode(true);
          }}
        >
          {todo.title}
        </label>

        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        />
      </div>

      {isEditingMode && (
        <input
          type="text"
          className="edit"
          value={updatedName}
          onKeyDown={(event) => handleKeyDown(event, todo)}
          onChange={(e) => setUpdatedName(e.target.value)}
          onBlur={() => handleOnBlur(todo)}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      )}
    </li>
  );
};
