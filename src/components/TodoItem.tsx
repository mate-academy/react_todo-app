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

interface Props {
  todo: Todo;
}

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
      data-id={id}
      className={cn({
        editing: isEdit,
        completed: !isEdit && completed,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
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
          onClick={handleDeleteClick}
        />
      </div>
      {isEdit && (
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
      {/* <li className="completed">
      <div className="view">
        <input type="checkbox" className="toggle" id="toggle-completed" />
        <label htmlFor="toggle-completed">qwertyuio</label>
        <button type="button" className="destroy" data-cy="deleteTodo" />
      </div>
      <input type="text" className="edit" />
    </li>

    <li className="editing">
      <div className="view">
        <input type="checkbox" className="toggle" id="toggle-editing" />
        <label htmlFor="toggle-editing">zxcvbnm</label>
        <button type="button" className="destroy" data-cy="deleteTodo" />
      </div>
      <input type="text" className="edit" />
    </li>

    <li>
      <div className="view">
        <input type="checkbox" className="toggle" id="toggle-view2" />
        <label htmlFor="toggle-view2">1234567890</label>
        <button type="button" className="destroy" data-cy="deleteTodo" />
      </div>
      <input type="text" className="edit" />
    </li> */}
    </li>
  );
};
