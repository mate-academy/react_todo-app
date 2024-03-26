import React, { useContext, useState } from 'react';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { ContextTodos } from './TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useContext(ContextTodos);

  const [isEditable, setIsEditable] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo.title);
  const handleChange = () => {
    dispatch({
      type: 'update',
      playload: {
        ...todo,
        completed: !todo.completed,
      },
    });
  };

  const handleDestroy = (todoId: number) => {
    dispatch({
      type: 'delete',
      playload: {
        id: todoId,
      },
    });
  };

  const handleUpdate = () => {
    if (editedTodo === '') {
      handleDestroy(todo.id);
      setIsEditable(false);

      return;
    }

    dispatch({
      type: 'update',
      playload: {
        ...todo,
        title: editedTodo,
      },
    });

    setIsEditable(false);
  };

  const handleEdit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleUpdate();
      setIsEditable(false);
    }

    if (event.key === 'Escape') {
      setIsEditable(false);
    }
  };

  return (
    <>
      <li
        className={cn({
          completed: todo.completed,
          editing: isEditable,
        })}
        onDoubleClick={() => setIsEditable(true)}
      >
        <div className="view">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleChange}
            className="toggle"
            id="toggle-view"
          />
          <label htmlFor="toggle-view">{todo.title}</label>
          <button
            type="button"
            onClick={() => handleDestroy(todo.id)}
            className="destroy"
            data-cy="deleteTodo"
          />
        </div>
        <input
          type="text"
          className="edit"
          value={editedTodo}
          onChange={event => setEditedTodo(event.target.value)}
          onKeyUp={handleEdit}
          onBlur={handleUpdate}
        />
      </li>
    </>
  );
};
