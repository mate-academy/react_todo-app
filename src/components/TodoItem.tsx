import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { DispatchContext } from './TodosContext/TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [edited, setEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (edited && titleRef.current) {
      titleRef.current.focus();
    }
  }, [edited]);

  const handleDounbleClick = () => {
    setEdited(true);
  };

  const handlerEditTodoTitle = () => {
    dispatch({
      type: 'editTitle',
      id: todo.id,
      newTitle: editedTitle,
    });

    setEdited(false);
  };

  const handleDeleteTodo = () => {
    dispatch({
      type: 'removeTodo',
      id: todo.id,
    });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEdited(false);
      setEditedTitle(todo.title);
    }

    if (event.key === 'Enter') {
      handlerEditTodoTitle();
    }
  };

  return (
    <li className={classNames({
      completed: todo.completed,
      editing: edited,
    })}
    >
      <div className="view" onDoubleClick={handleDounbleClick}>
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
        />
        <label>{todo.title}</label>
        {/* eslint-disable-next-line */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        type="text"
        ref={titleRef}
        value={editedTitle}
        className="edit"
        onChange={event => setEditedTitle(event.target.value)}
        onKeyUp={handleKeyUp}
        onBlur={handlerEditTodoTitle}
      />
    </li>
  );
};
