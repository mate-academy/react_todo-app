/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../helpers/Todo';
import { DispatchTodos } from '../TodosContext/TodosContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchTodos);
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDeleteClick = () => {
    dispatch({
      type: 'deleteTodo',
      id: todo.id,
    });
  };

  const handleChangeCompletedState = () => {
    dispatch({
      type: 'editTodo',
      id: todo.id,
      newCompleted: !todo.completed,
    });
  };

  const handleDoubleClick = (
  ) => {
    setEdit(true);
  };

  useEffect(() => {
    if (inputRef.current && edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  const saveNewTitleTodo = (event: string) => {
    dispatch({
      type: 'editTodo',
      id: todo.id,
      newTitle: event,
    });
  };

  const checkKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setState(todo.title);
      setEdit(false);
    }

    if (event.key === 'Enter') {
      setEdit(false);
      saveNewTitleTodo(inputRef.current?.value || '');
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed === true,
        editing: edit,
      })}
      onBlur={() => setEdit(false)}
    >
      <div className="view">
        <input
          checked={todo.completed}
          type="checkbox"
          className="toggle"
          id={classNames({
            'toggle-view': todo.completed === false,
            'toggle-completed': todo.completed === true,
            'toggle-editing': edit,
          })}
          onChange={handleChangeCompletedState}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteClick}
        />
      </div>
      <input
        type="text"
        className="edit"
        onKeyUp={checkKey}
        value={state}
        onChange={event => setState(event.target.value)}
        ref={inputRef}
      />
    </li>
  );
};
