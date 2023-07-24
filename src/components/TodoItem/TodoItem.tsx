import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../TodoContext';

interface Props {
  todo: Todo
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    todos,
    setTodos,
    deleteTodo,
    toggleTodo,
  } = React.useContext(TodoContext);
  const [selectedTodo, setSelectedTodo] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const selectedField = React.useRef<HTMLInputElement>(null);

  const handleTitleChange = () => {
    setSelectedTodo(false);
    if (newTitle === '') {
      deleteTodo(todo.id);
    } else {
      const newTodos = todos.map(t => ({
        ...t,
        title: t.id === todo.id
          ? newTitle
          : t.title,
      }));

      setTodos(newTodos);
    }
  };

  const handleCancel = () => {
    setSelectedTodo(false);
    setNewTitle(todo.title);
  };

  useEffect(() => {
    if (selectedField.current) {
      selectedField.current.focus();
    }
  }, [selectedTodo]);

  return (
    <li
      className={classNames({
        editing: selectedTodo,
        completed: todo.completed,
      })}
    >
      <div
        id={`${todo.id}`}
        className="view"
        onDoubleClick={() => {
          setSelectedTodo(true);
        }}
      >
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view${todo.id}`}
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          aria-label="Delete"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={selectedField}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleTitleChange();
          }
        }}
        onKeyUp={(event) => {
          if (event.key === 'Escape') {
            handleCancel();
          }
        }}
        value={newTitle}
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
        onBlur={() => handleTitleChange()}

      />
    </li>
  );
};
