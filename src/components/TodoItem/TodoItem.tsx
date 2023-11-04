import cn from 'classnames';
import { useContext, useState } from 'react';
import { TodoItemType } from '../../types/TodoItemType';
import { DispatchContext, TodosContext } from '../GlobalStateProvider';
import { AllActions } from '../../types/Action';

type Props = {
  todo: TodoItemType,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [updatedName, setUpdatedName] = useState(todo.title);

  const handleChange = (id: number) => {
    const index = todos.findIndex(item => item.id === id);
    const updated = todos[index];

    updated.completed = !updated.completed;
    dispatch({ type: AllActions.Update, payload: id, value: updated });
  };

  const handleDelete = () => {
    dispatch({ type: AllActions.Remove, payload: todo.id });
  };

  const handleKeyDown
    = (event: React.KeyboardEvent, updated: TodoItemType) => {
      if (event.key === 'Enter' && updatedName.trim() !== '') {
        const updatedCopy = { ...updated, title: updatedName.trim() };

        dispatch(
          { type: AllActions.Update, payload: updated.id, value: updatedCopy },
        );

        setIsEditingMode(false);
      }

      if (event.key === 'Enter' && updatedName.trim() === '') {
        dispatch({
          type: AllActions.Remove, payload: todo.id,
        });
      }
    };

  const handleKeyUp
    = (event: React.KeyboardEvent<HTMLInputElement>, updated: TodoItemType) => {
      if (event.key === 'Escape') {
        setUpdatedName(updated.title);
        setIsEditingMode(false);
      }
    };

  const handleOnBlur = (updated: TodoItemType) => {
    if (updatedName.trim() === '') {
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
          onDoubleClick={() => setIsEditingMode(true)}
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

      <input
        type="text"
        className="edit"
        value={updatedName}
        onKeyDown={(event) => handleKeyDown(event, todo)}
        onKeyUp={(event) => handleKeyUp(event, todo)}
        onChange={(e) => setUpdatedName(e.target.value)}
        onBlur={() => handleOnBlur(todo)}
      />
    </li>
  );
};
