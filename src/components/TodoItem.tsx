/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useState, useRef,
} from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from '../contexts/TodosContext';
import { TodoStatus } from '../types/TodoStatus';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const editInputRef = useRef<HTMLInputElement>(null);

  const { id, title, completed } = todo;

  const handleTodoDelete = (todoId: number) => {
    const filteredTodos
      = todos.filter(currentTodo => currentTodo.id !== todoId);

    setTodos(filteredTodos);
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
      handleTodoDelete(todo.id);
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

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOnBlur();
    }

    if (e.key === 'Escape') {
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
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleTodoDelete(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onBlur={handleOnBlur}
        onKeyUp={handleKeyUp}
        onChange={e => setNewTitle(e.target.value)}
        ref={editInputRef}
      />
    </li>
  );
};
