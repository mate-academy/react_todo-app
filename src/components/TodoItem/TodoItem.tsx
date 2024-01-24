import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import cn from 'classnames';
import { TodosContext } from '../../contexts/TodosContext';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleHideInput = () => {
    setIsEditing(false);
  };

  const handleAddChangedTodo = (event: React.
    KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && editedTitle.length > 0) {
      setTodos(todos.map(
        (task) => ({
          ...task,
          title: id === task.id
            ? editedTitle.trim()
            : task.title,
        }),
      ));

      handleHideInput();
    }

    if (event.key === 'Escape') {
      setEditedTitle(title);
      handleHideInput();
    }
  };

  const handleCompleteTodo = () => {
    setTodos(prevTodos => prevTodos.map((task) => (
      (todo.id === task.id)
        ? ({ ...task, completed: !task.completed })
        : (task)
    )));
  };

  const handleDeleteTodo = () => {
    const remainedTodos = todos.filter((task) => task.id !== id);

    setTodos(remainedTodos);
  };

  return (
    <li
      className={cn({
        completed: completed === true,
        editing: isEditing === true,
      })}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          className="edit"
          onChange={handleTitleChange}
          onKeyUp={handleAddChangedTodo}
          onBlur={handleHideInput}
          value={editedTitle}
          ref={titleField}
        />
      ) : (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-view-${id}`}
            onChange={handleCompleteTodo}
            checked={completed}
          />
          <label
            htmlFor={`toggle-view-${id}`}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="asdfghj"
            onClick={handleDeleteTodo}
          />
        </div>
      )}
    </li>
  );
};
