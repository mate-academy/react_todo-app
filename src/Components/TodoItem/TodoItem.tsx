import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../Types/Todo';
import { DispatchContext } from '../../Context/TodoContext';
import { ReducerType } from '../../Types/ReducerType';

type Props = {
  todoItem: Todo;
};

export const TodoItem: React.FC<Props> = ({ todoItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todo, setTodo] = useState(todoItem);
  const inputElement = useRef<HTMLInputElement | null>(null);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    setTodo(todoItem);
  }, [todoItem]);

  const { id, title, completed } = todo;

  const handleSubmitInput = () => {
    setIsEditing(false);

    if (title.trim()) {
      dispatch({
        type: ReducerType.ChangeTodo,
        payload: {
          id,
          title: title.trim(),
          completed: false,
        },
      });
    } else {
      dispatch({
        type: ReducerType.DeleteTodo,
        payload: id,
      });
    }
  };

  const handleEscEntrEditSubmit = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const { key } = e;

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

  const handleToggle = () => {
    dispatch({
      type: ReducerType.ChangeTodo,
      payload: {
        id,
        title,
        completed: !completed,
      },
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((currentTodo) => ({
      ...currentTodo,
      title: e.target.value,
    }));
  };

  const handleDelete = () => {
    dispatch({
      type: ReducerType.DeleteTodo,
      payload: todo.id,
    });
  };

  useEffect(() => {
    inputElement.current?.focus();
  }, [isEditing]);

  return (
    <li
      className={cn({
        completed,
        editing: isEditing,
      })}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleToggle}
          checked={completed}
        />
        <label>{title}</label>
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
        value={title}
        ref={inputElement}
        onChange={handleEditChange}
        onBlur={handleSubmitInput}
        onKeyUp={handleEscEntrEditSubmit}
      />
    </li>
  );
};
