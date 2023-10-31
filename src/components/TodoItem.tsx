import React, { useContext, useState, useRef } from 'react';
import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';
import { TodosContext } from '../contexts/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const { id, title, completed } = todo;

  const editInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (todoId: number) => {
    const filteredTodo = todos.filter(currentTodo => currentTodo.id !== todoId);

    setTodos(filteredTodo);
  };

  const handleToggle = () => {
    const modifiedTodos = todos.map(currentTodo => {
      return currentTodo.id === id
        ? {
          ...currentTodo,
          completed: !currentTodo.completed,
        }
        : currentTodo;
    });

    setTodos(modifiedTodos);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);

    setTimeout(() => {
      editInputRef.current?.focus();
    }, 1);
  };

  const saveChanges = (titleToSet: string) => {
    if (!titleToSet) {
      handleDelete(todo.id);
    } else {
      const modifiedTodos = todos.map(currentTodo => {
        if (currentTodo.id === todo.id) {
          return {
            ...currentTodo,
            title: titleToSet,
          };
        }

        return currentTodo;
      });

      setTodos(modifiedTodos);
    }

    setIsEditing(false);
  };

  const discardChanges = () => {
    setNewTitle(todo.title);
    setIsEditing(false);
  };

  const handleOnBlur = () => {
    saveChanges(newTitle);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleOnBlur();
    }

    if (event.key === 'Escape') {
      discardChanges();
      handleOnBlur();
    }
  };

  let todoClassName = TodoStatus.View;

  if (isEditing) {
    todoClassName = TodoStatus.Editing;
  } else if (completed) {
    todoClassName = TodoStatus.Completed;
  }

  return (
    <li className={todoClassName}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={handleToggle}
          checked={todo.completed}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          aria-label="delete"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDelete(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onBlur={handleOnBlur}
        onKeyUp={handleKeyUp}
        onChange={event => setNewTitle(event.target.value)}
        ref={editInputRef}
      />
    </li>
  );
};
