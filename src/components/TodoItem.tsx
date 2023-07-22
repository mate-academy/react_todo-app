import {
  FC, ChangeEvent, useState, useEffect, useRef,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types';
import { useTodoContext } from '../hooks/useTodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: FC<Props> = ({ todo }) => {
  const { onUpdateTodo, onDeleteTodo } = useTodoContext();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const editRef = useRef<HTMLInputElement | null>(null);

  const todoClassnames = classNames({
    completed: todo.completed,
    editing: isEditing,
  });

  const updateTodoCompleted = (event: ChangeEvent<HTMLInputElement>) => {
    const completed = event.target.checked;

    const updatedTodo: Todo = {
      ...todo,
      completed,
    };

    onUpdateTodo(updatedTodo);
  };

  const updateTodoTitle = () => {
    if (todo.title === newTitle) {
      return;
    }

    if (!newTitle) {
      onDeleteTodo(todo.id);

      return;
    }

    const updatedTodo: Todo = {
      ...todo,
      title: newTitle,
    };

    onUpdateTodo(updatedTodo);
  };

  const handleEditTodoTitle = (
    event?: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (!event || event.key === 'Enter') {
      updateTodoTitle();

      setIsEditing(false);
    }
  };

  useEffect(() => {
    const cancelEditing = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
        setNewTitle(todo.title);
      }
    };

    document.addEventListener('keyup', cancelEditing);

    return () => {
      document.removeEventListener('keyup', cancelEditing);
    };
  }, []);

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li className={todoClassnames}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={updateTodoCompleted}
        />

        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </label>

        {/* eslint-disable-next-line */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDeleteTodo(todo.id)}
        />
      </div>

      {isEditing && (
        <input
          ref={editRef}
          type="text"
          className="edit"
          value={newTitle}
          onBlur={() => handleEditTodoTitle()}
          onKeyDown={handleEditTodoTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
      )}
    </li>
  );
};
