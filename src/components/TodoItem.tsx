import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from '../utils/TodoContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const titleField = useRef<HTMLInputElement>(null);

  const handleDeleteTodo = () => {
    setTodos(currentTodos => currentTodos
      .filter(elem => elem.id !== todo.id));
  };

  const handleCompleteTodo = () => {
    const updatedTodos = [...todos];
    const currentTodoIndex = updatedTodos
      .findIndex((elem: Todo) => elem.id === todo.id);

    if (currentTodoIndex !== -1) {
      const newCompleted = !updatedTodos[currentTodoIndex].completed;

      updatedTodos[currentTodoIndex] = {
        ...updatedTodos[currentTodoIndex],
        completed: newCompleted,
      };
      updatedTodos.splice(currentTodoIndex, 1, updatedTodos[currentTodoIndex]);

      setTodos(updatedTodos);
    }
  };

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleEditTodo = () => {
    setNewTitle(todo.title);
    setIsEditing(true);

    setTimeout(() => {
      if (titleField.current !== null) {
        titleField.current.focus();
      }
    }, 0);
  };

  const handleEndEditTodoOnBlur = () => {
    if (!isEditing || !newTitle) {
      setIsEditing(false);

      return;
    }

    const updatedTodos = [...todos];
    const currentTodoIndex = updatedTodos
      .findIndex((elem: Todo) => elem.id === todo.id);

    if (currentTodoIndex !== -1) {
      updatedTodos[currentTodoIndex] = {
        ...updatedTodos[currentTodoIndex],
        title: newTitle.trim(),
      };
      updatedTodos.splice(currentTodoIndex, 1, updatedTodos[currentTodoIndex]);
      setTodos(updatedTodos);
    } else {
      setTodos(currentTodos => currentTodos
        .filter(elem => elem.id !== todo.id));
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isEditing) {
      return;
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      handleEndEditTodoOnBlur();
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div
        className="view"
      >
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view${todo.id}`}
          checked={todo.completed}
          onChange={handleCompleteTodo}
        />
        <label
          onDoubleClick={handleEditTodo}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        ref={titleField}
        type="text"
        className="edit"
        value={newTitle}
        onChange={handleEditTitle}
        onBlur={handleEndEditTodoOnBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
