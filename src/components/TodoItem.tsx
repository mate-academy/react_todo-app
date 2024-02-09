import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodoContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const titleField = useRef<HTMLInputElement>(null);

  const handleTodoComplete = () => {
    const updatedTodos = [...todos];
    const currentTodoIndex = updatedTodos
      .findIndex((item: Todo) => item.id === todo.id);

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

  const handleTodoEdit = () => {
    setNewTitle(todo.title);
    setIsEditing(true);

    setTimeout(() => {
      if (titleField.current !== null) {
        titleField.current.focus();
      }
    }, 0);
  };

  const handleTodoDelete = () => {
    setTodos(currentTodos => currentTodos.filter(item => item.id !== todo.id));
  };

  const handleTitleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleEndEditing = () => {
    if (isEditing) {
      if (newTitle !== '') {
        const updatedTodos = [...todos];
        const currentTodoIndex = updatedTodos
          .findIndex((item: Todo) => item.id === todo.id);

        if (currentTodoIndex !== -1) {
          updatedTodos[currentTodoIndex] = {
            ...updatedTodos[currentTodoIndex],
            title: newTitle.trim(),
          };
          updatedTodos
            .splice(currentTodoIndex, 1, updatedTodos[currentTodoIndex]);

          setTodos(updatedTodos);
        }
      } else {
        setTodos(currentTodos => currentTodos
          .filter(item => item.id !== todo.id));
      }
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && isEditing) {
      setIsEditing(false);
    } else if (event.key === 'Enter' && isEditing) {
      handleEndEditing();
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view${todo.id}`}
          checked={todo.completed}
          onChange={handleTodoComplete}
        />
        <label
          onDoubleClick={handleTodoEdit}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={handleTodoDelete}
        />
      </div>
      <input
        ref={titleField}
        type="text"
        className="edit"
        value={newTitle}
        onChange={handleTitleEdit}
        onBlur={handleEndEditing}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
