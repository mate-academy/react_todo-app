import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { TodoContext } from '../../context/TodoContext';
import { Todo } from '../../interface/Todo';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodos } = useContext(TodoContext);
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleComplete = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodos(prev => prev.map(currentTodo => {
      if (currentTodo.id === todo.id) {
        return { ...currentTodo, completed: event.target.checked };
      }

      return currentTodo;
    }));
  };

  const handleDelete = () => {
    setTodos(prev => prev.filter(({ id }) => id !== todo.id));
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
      setIsEdit(false);
    }

    if (!title) {
      handleDelete();
    }
  };

  const handlePressEscape = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      setIsEdit(false);
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
      className={classnames({
        completed: todo.completed,
        editing: isEdit,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={classnames({
            'toggle-view': !todo.completed && !isEdit,
            'toggle-completed': todo.completed,
            'toggle-editing': isEdit,
          })}
          checked={todo.completed}
          onChange={handleComplete}
        />
        <label
          onDoubleClick={() => setIsEdit(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete"
          onClick={handleDelete}
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
