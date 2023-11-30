/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';

import {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from '../TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const { id, title, completed } = todo;

  const [editTitle, setEditTitle] = useState(title);
  const [isEdit, setIsEdit] = useState(false);
  const editNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editNameRef.current) {
      editNameRef.current.focus();
    }
  }, [isEdit]);

  const handleToggleViewChange = () => {
    let isChecked: boolean = completed;

    if (completed) {
      isChecked = false;
    } else {
      isChecked = true;
    }

    setTodos(todos
      .map(todoItem => (todoItem.id === id
        ? { ...todoItem, completed: isChecked }
        : todoItem)));
  };

  const handleTodoTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditTitle(event.target.value);
  };

  const saveTitle = (value: string) => {
    if (value.trim()) {
      setTodos(todos
        .map(todoItem => (todoItem.id === id
          ? { ...todoItem, title: value.trim() }
          : todoItem)));

      setEditTitle(value.trim());
    } else {
      setTodos(todos.filter(todoItem => todoItem.id !== id));
    }

    setIsEdit(false);
  };

  const handleTodoTitleBlur = () => {
    if (editNameRef.current) {
      saveTitle(editNameRef.current.value);
    }
  };

  const handleTodoTitleKeyUp = (
    event: React.KeyboardEvent,
  ) => {
    if (event.key === 'Enter') {
      if (editNameRef.current) {
        saveTitle(editNameRef.current.value);
      }
    }

    if (event.key === 'Escape') {
      setEditTitle(title);
      setIsEdit(false);
    }
  };

  const handleDeleteClick = () => {
    setTodos(todos.filter(todoItem => todoItem.id !== id));
  };

  return (
    <li
      className={cn({
        editing: isEdit,
        completed: !isEdit && completed,
      })}
    >
      {!isEdit
        ? (
          <div className="view">
            <input
              type="checkbox"
              id={`toggle-${id}`}
              className="toggle"
              onChange={handleToggleViewChange}
              checked={completed}
            />

            <label
              onDoubleClick={() => setIsEdit(true)}
            >
              {title}
            </label>

            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              aria-label="deleteTodo"
              onClick={handleDeleteClick}
            />
          </div>
        )
        : (
          <input
            type="text"
            className="edit"
            ref={editNameRef}
            onChange={handleTodoTitleChange}
            onKeyUp={handleTodoTitleKeyUp}
            onBlur={handleTodoTitleBlur}
            value={editTitle}
          />
        )}
    </li>
  );
};
