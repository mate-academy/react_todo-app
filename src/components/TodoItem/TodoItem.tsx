import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import { Todo } from '../../type/type';
import { useTodos } from '../../hooks/useTodos';

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;
  const { todos, setTodos } = useTodos();

  const [changedTodoTitle, setChangedTodoTitle] = React.useState(title);
  const [isEditing, setIsEditing] = React.useState(false);

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [isEditing]);

  const handleCheckbox = () => {
    setTodos(
      todos.map(prevTodo => {
        return prevTodo.id === todo.id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo;
      }),
    );
  };

  const handleDeleteTodo = () => {
    setTodos(todos.filter(prevTodo => prevTodo.id !== todo.id));
  };

  const handleAddNewTitle = () => {
    if (!changedTodoTitle) {
      handleDeleteTodo();
      setIsEditing(false);

      return;
    }

    setTodos(
      todos.map(prevTodo => {
        return prevTodo.id === todo.id
          ? { ...prevTodo, title: changedTodoTitle.trim() }
          : prevTodo;
      }),
    );

    setIsEditing(false);
    setChangedTodoTitle(changedTodoTitle.trim());
  };

  const handleInputButtons = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddNewTitle();
    }

    if (event.key === 'Escape') {
      setChangedTodoTitle(title);
      setIsEditing(false);
    }
  };

  const hadleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangedTodoTitle(event.target.value);
  };

  return (
    <li
      className={cn({
        completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onClick={handleCheckbox}
        />

        <label onDoubleClick={() => setIsEditing(true)}>{title}</label>

        <button
          id="delete-button"
          type="button"
          aria-label="Destroy"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={changedTodoTitle}
        ref={inputField}
        onChange={hadleInputChange}
        onBlur={handleAddNewTitle}
        onKeyUp={handleInputButtons}
      />
    </li>
  );
};

export default TodoItem;
