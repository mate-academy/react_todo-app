import cn from 'classnames';
import React, { useContext, useState } from 'react';
import { Todo } from '../../types/todo';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const { title, completed, id } = todo;
  const [editing, setEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(title);

  const handleComplete = () => {
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = () => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleStartEdit = () => {
    setEditing(!editing);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleSaveEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && titleValue.length === 0) {
      handleDeleteTodo();
    } else if (e.key === 'Enter') {
      setTodos(todos.map((item) => {
        if (item.id === id) {
          return { ...item, title: titleValue };
        }

        setEditing(!editing);

        return item;
      }));
    }
  };

  const handleCancelEditing = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setTitleValue(title);
      setEditing(!editing);
    }
  };

  const completedToggleClass
    = cn({ 'toggle-view': !completed },
      { 'toggle-completed': completed });

  return (
    <li className={cn({ completed }, { editing })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={completedToggleClass}
          onChange={handleComplete}
          checked={completed}
        />
        <label
          htmlFor={completedToggleClass}
          onClick={(e) => {
            e.preventDefault();
          }}
          onDoubleClickCapture={handleStartEdit}
          role="presentation"
        >
          {titleValue}
        </label>
        <button
          type="button"
          aria-label={titleValue}
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      {editing && (
        <input
          type="text"
          className="edit"
          value={titleValue}
          onBlur={(() => setEditing(false))}
          onChange={handleOnChange}
          onKeyDown={handleSaveEdit}
          onKeyUp={handleCancelEditing}
        />
      )}
    </li>
  );
};
