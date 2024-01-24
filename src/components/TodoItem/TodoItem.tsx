import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from '../TodosContext/TodosContext';
import { ActionTypes } from '../../types/types';

type Props = {
  title: string;
  id: number;
};

export const TodoItem: React.FC<Props> = ({ title, id }) => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(true);

  const indexTodo: number = todos.findIndex((todo) => todo.id === id);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleComplete = () => {
    dispatch({ type: ActionTypes.CompleteTodo, payload: indexTodo });
  };

  const handleRemove = () => {
    dispatch({ type: ActionTypes.RemoveTodo, payload: indexTodo });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      if (newTitle.trim().length > 0) {
        const mineTodo = todos[indexTodo];

        dispatch({
          type: ActionTypes.EditTodo,
          payload: { ...mineTodo, title: newTitle },
        });
      } else {
        handleRemove();
      }

      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (newTitle.trim().length > 0) {
      const mineTodo = todos[indexTodo];

      dispatch({
        type: ActionTypes.EditTodo,
        payload: { ...mineTodo, title: newTitle },
      });
    } else {
      handleRemove();
    }

    setIsEditing(false);
  };

  useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li className={cn({
      completed: todos[indexTodo].completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={handleComplete}
          checked={todos[indexTodo].completed}
        />

        <label onDoubleClick={handleEdit}>
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Edit"
          onClick={handleRemove}
        />
      </div>

      {isEditing && (
        <input
          type="text"
          className="edit"
          ref={inputRef}
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />
      )}
    </li>
  );
};
