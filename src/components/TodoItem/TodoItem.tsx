import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../context/TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  });

  const deleteTodo = useCallback((todoID: number) => {
    setTodos(currentTodos => currentTodos.filter(
      todoItem => todoItem.id !== todoID,
    ));
  }, []);

  const toggleTodoCompleted = useCallback((todoID: number) => {
    setTodos(currentTodos => currentTodos.map(
      todoItem => (todoItem.id === todoID
        ? { ...todoItem, completed: !todoItem.completed }
        : todoItem),
    ));
  }, []);

  let id;
  let htmlFor;

  if (editMode) {
    id = `toggle-editing${todo.id}`;
    htmlFor = `toggle-editing${todo.id}`;
  } else if (todo.completed) {
    id = `toggle-completed${todo.id}`;
    htmlFor = `toggle-completed${todo.id}`;
  } else {
    id = `toggle-view${todo.id}`;
    htmlFor = `toggle-view${todo.id}`;
  }

  const renameTodo = (todoId: number, newTitle: string) => {
    setTodos(
      todos.map(item => (
        item.id === todoId
          ? { ...item, title: newTitle }
          : item
      )),
    );
  };

  const handleSave = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!updatedTitle) {
      deleteTodo(todo.id);

      return;
    }

    if (updatedTitle !== todo.title) {
      renameTodo(todo.id, updatedTitle);
    }

    setEditMode(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave(e);
    }

    if (e.key === 'Escape') {
      setUpdatedTitle(todo.title);
      setEditMode(false);
    }
  };

  return (
    <li
      key={todo.id}
      className={classNames(
        {
          completed: todo.completed,
          editing: editMode,
        },
      )}
      onDoubleClick={() => setEditMode(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          checked={todo.completed}
          onChange={() => toggleTodoCompleted(todo.id)}
        />
        <label htmlFor={htmlFor}>
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteButton"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>

      {editMode
        && (
          <input
            type="text"
            className="edit"
            ref={inputRef}
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
          />
        )}
    </li>
  );
};
