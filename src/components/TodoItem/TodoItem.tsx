/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodos } = useContext(TodosContext);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleRemoveTodo = () => {
    setTodos(prev => prev.filter(({ id }) => id !== todo.id));
  };

  const handleCompleteTodo = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodos(prev => prev.map(currentTodo => {
      if (currentTodo.id === todo.id) {
        return { ...currentTodo, completed: event.target.checked };
      }

      return currentTodo;
    }));
  };

  const handleEditTodo = (
    title: string,
  ) => {
    if (title && title !== todo.title) {
      setTodos(prev => prev.map(currentTodo => {
        if (currentTodo.id === todo.id) {
          return { ...currentTodo, title };
        }

        return currentTodo;
      }));
      setIsEditingEnabled(false);
    }

    if (!title) {
      handleRemoveTodo();
    }
  };

  const handlePressEscape = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      setIsEditingEnabled(false);
    }
  };

  const handlePressEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      handleEditTodo(newTitle);
    }
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: isEditingEnabled,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={cn({
            'toggle-view': !todo.completed && !isEditingEnabled,
            'toggle-completed': todo.completed,
            'toggle-editing': isEditingEnabled,
          })}
          checked={todo.completed}
          onChange={handleCompleteTodo}
        />
        <label
          onDoubleClick={() => setIsEditingEnabled(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleRemoveTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onKeyUp={handlePressEscape}
        onChange={(event) => setNewTitle(event.target.value)}
        onKeyDown={handlePressEnter}
        onBlur={() => handleEditTodo(newTitle)}
      />
    </li>
  );
};
