import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo, todos, setTodos,
}) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [isEditedTitle, setIsEditedTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleTodo = () => {
    setTodos(todos.map(currTodo => {
      if (currTodo.id === id) {
        return {
          ...currTodo,
          completed: !currTodo.completed,
        };
      }

      return currTodo;
    }));
  };

  const updateTodoTitle = (newTitle: string, todoId: number) => {
    setTodos(todos.map(currTodo => {
      if (currTodo.id === todoId) {
        return {
          ...currTodo,
          title: newTitle,
        };
      }

      return currTodo;
    }));
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter(item => item.id !== todoId));
  };

  const changeTitleOnBlur = (newTitle: string) => {
    // eslint-disable-next-line no-console
    console.log(newTitle);
    if (!newTitle) {
      deleteTodo(id);

      return;
    }

    if (isEditedTitle !== title) {
      updateTodoTitle(isEditedTitle, id);
    }

    setIsEditing(false);
  };

  const changeTitleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsEditedTitle(title);
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (!isEditedTitle) {
        deleteTodo(id);

        return;
      }

      updateTodoTitle(isEditedTitle, id);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  return (
    <li
      key={todo.id}
      className={classNames(
        {
          completed,
          editing: isEditing,
        },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={toggleTodo}
        />

        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </label>
        {/* eslint-disable jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>

      {isEditing && (
        <input
          type="text"
          className="edit"
          value={isEditedTitle}
          onChange={event => setIsEditedTitle(event.target.value)}
          onKeyUp={changeTitleOnKeyUp}
          onBlur={() => changeTitleOnBlur(isEditedTitle)}
          ref={inputRef}
        />
      )}
    </li>
  );
};
