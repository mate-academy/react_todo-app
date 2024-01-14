/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../types/todo';
import { TodosContext } from './Store';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [completed, setCompleted] = useState(todo.complete);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const titleField = useRef<HTMLInputElement>(null);

  const { updateTodo } = useContext(TodosContext);

  const handleCheckbox = () => {
    setCompleted(!completed);
    const updatedTodo = { ...todo, complete: !completed };

    updateTodo(updatedTodo);
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (editing && titleField.current) {
      titleField.current.focus();
    }
  }, [editing]);

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <li className={cn({ completed, editing })}>
      <div
        className="view"
        onDoubleClick={handleEdit}
      >
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleCheckbox}
        />
        <label>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={titleField}
        value={title}
        onChange={handleEditTitle}
        onBlur={handleEdit}
      />
    </li>
  );
};
