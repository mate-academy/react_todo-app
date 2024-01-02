/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo, ReducerType } from '../../types';
import { DispatchContext } from '../../state/TodosContext';

interface Props {
  todoItem: Todo,
}

export const TodoItem: React.FC<Props> = ({ todoItem }) => {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState(todoItem);
  const [initialTitle, setInitialTitle] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    setTodo(todoItem);
  }, [todoItem]);

  const { id, title, completed } = todo;

  const handleInputSubmit = () => {
    setEdit(false);

    if (title.trim()) {
      dispatch({
        type: ReducerType.ChangeTodo,
        payload: {
          id,
          title: title.trim(),
          completed,
        },
      });
    } else {
      dispatch({
        type: ReducerType.DeleteTodo,
        payload: id,
      });
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      handleInputSubmit();
    }
    if (event.key === 'Escape') {
      setEdit(false);
      setTodo({ ...todo, title: initialTitle });
    }
  };

  useEffect(() => {
    setInitialTitle(todo.title);
  }, [todoItem]);

  const toggleCompleted = () => {
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

  const handleClick = () => {
    dispatch({
      type: ReducerType.DeleteTodo,
      payload: id,
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <li
      className={classNames({
        completed,
        editing: edit,
      })}
      onDoubleClick={() => setEdit(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={toggleCompleted}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleClick}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputRef}
        value={title}
        onChange={handleInputChange}
        onBlur={handleInputSubmit}
        onKeyUp={handleKeyDown}
      />
    </li>
  );
};
