import cn from 'classnames';
import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../store/TodosContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const { id, title, completed } = todo;

  const [newTitle, setNewTitle] = useState(title);
  const [isTodoClicked, setIsTodoClicked] = useState(false);

  const handleCheckboxClick = () => {
    setTodos(todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return { ...currentTodo, completed: !completed };
      }

      return currentTodo;
    }));
  };

  const handleDoubleClick = () => {
    setIsTodoClicked(true);
  };

  const handleDelete = () => {
    setTodos(todos.filter(currentTodo => currentTodo.id !== id));
  };

  const handleNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const saveNewTitle = () => {
    setIsTodoClicked(false);

    if (!newTitle.trim()) {
      handleDelete();

      return;
    }

    if (newTitle === title) {
      return;
    }

    setTodos(todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return { ...currentTodo, title: newTitle };
      }

      return currentTodo;
    }));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsTodoClicked(false);
    }

    if (event.key === 'Enter') {
      saveNewTitle();
    }
  };

  return (
    <>
      <li
        className={cn({
          completed,
          editing: isTodoClicked,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={completed}
            onClick={handleCheckboxClick}
          />
          <label
            htmlFor="toggle-view"
            onDoubleClick={handleDoubleClick}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={handleDelete}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={newTitle}
          onChange={handleNewTitle}
          onBlur={saveNewTitle}
          onKeyUp={handleKeyUp}
        />
      </li>
    </>
  );
};
