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
  const [showEmptyTitleAlert, setShowEmptyTitleAlert] = useState(false);

  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (edited && titleRef.current) {
      titleRef.current.focus();
    }
  }, [edited]);

  const handleDounbleClick = () => {
    setEdited(true);
  };

  const handleDeleteTodo = () => {
    dispatch({
      type: 'removeTodo',
      id: todo.id,
    });
  };

  const handlerEditTodoTitle = () => {
    if (showEmptyTitleAlert) {
      setEdited(false);
      setEditedTitle(todo.title);
    }

    if (editedTitle.trim()) {
      dispatch({
        type: 'editTitle',
        id: todo.id,
        newTitle: editedTitle,
      });

      setEdited(false);
    } else {
      setShowEmptyTitleAlert(true);
      // handleDeleteTodo();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEdited(false);
      setEditedTitle(todo.title);
      setShowEmptyTitleAlert(false);
    }

    if (event.key === 'Enter') {
      if (editedTitle.length !== 0) {
        setShowEmptyTitleAlert(false);
        handlerEditTodoTitle();
      } else {
        setShowEmptyTitleAlert(true);
      }
    }
  };

  const handleChangeCompleted = () => {
    dispatch({
      type: 'toggleCompleted',
      id: todo.id,
    });
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
          checked={todo.completed}
          onChange={handleChangeCompleted}
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
        placeholder={showEmptyTitleAlert ? "Title can't be empty!" : ''}
        className="edit"
        onChange={event => setEditedTitle(event.target.value)}
        onKeyUp={handleKeyUp}
        onBlur={handlerEditTodoTitle}
      />
    </li>
  );
};
