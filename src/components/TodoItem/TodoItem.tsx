import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type TodoItemProps = {
  todo: Todo;
  handleDeleteTodo: (todoId: number) => void,
  handleUpdateTodo: (
    todoId: number, data: { [key: string]: string | boolean }
  ) => void,
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleDeleteTodo,
  handleUpdateTodo,
}) => {
  const { id, completed, title } = todo;
  const [todoEditing, setTodoEditing] = useState(0);
  const [newTitle, setNewTitle] = useState(title);
  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoEditing === id && inputField.current) {
      inputField.current.focus();
    }
  }, [todoEditing]);

  const handleNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleSaveOrDeleteTitle = () => {
    if (todoEditing !== 0 && newTitle.trim()) {
      handleUpdateTodo(todoEditing, { title: newTitle });

      return setTodoEditing(0);
    }

    return handleDeleteTodo(todoEditing);
  };

  const handleChangeTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleSaveOrDeleteTitle();
    }

    if (e.keyCode === 27) {
      setTodoEditing(0);
    }
  };

  return (
    <li
      className={classNames({
        completed,
        editing: id === todoEditing,
      })}
      key={id}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onClick={() => handleUpdateTodo(id, { completed: !completed })}
        />
        <label
          htmlFor={todoEditing === id ? 'toggle-view' : ''}
          onDoubleClick={() => setTodoEditing(id)}
        >
          {title}
        </label>
        <button
          aria-label="deleteTodo"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeleteTodo(id)}
        />
      </div>
      <input
        type="text"
        ref={inputField}
        className="edit"
        value={newTitle}
        onChange={handleNewTitle}
        onBlur={handleSaveOrDeleteTitle}
        onKeyUp={handleChangeTitle}
      />
    </li>
  );
};
