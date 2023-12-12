/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import classNames from 'classnames';
import { DispatchContext } from '../TodosContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [trueTitle, setTrueTitle] = useState(todo.title);
  const [title, setTitle] = useState(trueTitle);
  const [isEdititng, setIsEditing] = useState(false);
  const titleField = useRef<HTMLInputElement>(null);
  const onChange = useContext(DispatchContext);

  useEffect(() => {
    if (titleField.current && isEdititng) {
      titleField.current.focus();
    }
  }, [isEdititng]);

  const onDone = (currentTodo: Todo) => {
    onChange({
      type: 'done',
      payload: currentTodo,
    });
  };

  const onDelete = (id: number) => {
    onChange({
      type: 'delete',
      payload: id,
    });
  };

  const handlerKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (title.length === 0) {
        onDelete(todo.id);
      }

      setTrueTitle(title);
      setIsEditing(false);
    } else if (event.key === 'Escape') {
      setIsEditing(false);
      setTitle(trueTitle);
    }
  };

  const handlerBlur = () => {
    setTrueTitle(title);
    setIsEditing(false);
  };

  return (
    <li
      key={todo.id}
      className={classNames(isEdititng
        ? 'editing'
        : classNames(todo.completed && 'completed'))}
    >
      {todo.completed}

      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={todo.id.toString()}
          onChange={() => onDone(todo)}
          checked={todo.completed}
        />
        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        onChange={(event) => setTitle(event.target.value)}
        onBlur={handlerBlur}
        onKeyUp={(event) => handlerKeyUp(event)}
        ref={titleField}
        value={title}
      />
    </li>
  );
};
