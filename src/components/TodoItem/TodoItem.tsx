/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../TodosContext';
import { ReducerType } from '../../types/enums/ReducerType';

interface Props {
  todoItem: Todo,
}

export const TodoItem: React.FC<Props> = ({ todoItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todo, setTodo] = useState(todoItem);
  const inputElement = useRef<HTMLInputElement | null>(null);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    setTodo(todoItem);
  }, [todoItem]);

  const { id, title, completed } = todo;

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSubmitInput = () => {
    setIsEditing(false);

    dispatch({
      type: ReducerType.ChangeTodo,
      payload: {
        id,
        title: title.trim(),
        completed,
      },
    });
  };

  const handleKeySubmitInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const { key } = event;

    switch (key) {
      case 'Escape':
        handleSubmitInput();
        break;

      case 'Enter':
        handleSubmitInput();
        break;

      default:
        break;
    }
  };

  const handleCheckboxChange = () => {
    dispatch({
      type: ReducerType.ChangeTodo,
      payload: {
        id,
        title,
        completed: !todo.completed,
      },
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(currentTodo => ({
      ...currentTodo,
      title: event.target.value,
    }));
  };

  const handleButtonDestroy = () => {
    dispatch({
      type: ReducerType.DeleteTodo,
      payload: id,
    });
  };

  useEffect(() => {
    inputElement.current?.focus();
  }, [isEditing]);

  return (
    <li
      className={classNames({
        completed,
        editing: isEditing,
      })}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleButtonDestroy}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputElement}
        value={title}
        onChange={handleInputChange}
        onBlur={handleSubmitInput}
        onKeyUp={handleKeySubmitInput}
      />
    </li>
  );
};
