import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../type/Todo';
import { TodosContext } from '../../Context/TodosContext';

type Props = {
  todo: Todo,
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completedTodo, editTodo, deleteItem } = useContext(TodosContext);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(todo.title);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && todo.title) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handleDone = () => {
    completedTodo(todo.id);
  };

  const handleEditTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (newTitle.trim()) {
        editTodo(newTitle, todo.id);
      }

      setIsEditing(false);
    } else if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <li
      key={todo.id}
      className={cn({ completed: todo.completed, editing: isEditing })}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${todo.id}`}
          onClick={handleDone}
          checked={todo.completed}
        />

        <label htmlFor={`toggle-${todo.id}`}>
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteItem(todo.id)}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
        onKeyUp={handleEditTodo}
        ref={titleField}
      />
    </li>
  );
};
