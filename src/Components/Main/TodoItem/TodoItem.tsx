/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import React, { useContext, useState } from 'react';
import { TodosContext } from '../../../Context/TodosContext';
import Todos from '../../../Types/Todos';

type Props = {
  todo: Todos
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    handleCompleted,
    handleUpdateTodo,
  } = useContext(TodosContext);

  const [isEdit, setIsEdit] = useState(false);
  const [editingText, setEditingText] = useState(todo.title);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.key === 'Enter') {
      setIsEdit(false);
      handleUpdateTodo(todo.id, editingText);
    }
  };

  const handleBlur = () => {
    setIsEdit(false);
    handleUpdateTodo(todo.id, editingText);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(event.target.value);
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: isEdit,
      })}
      key={todo.id}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          id={`${todo.id}`}
          onChange={() => handleCompleted(todo.id)}
        />

        {isEdit
          ? (
            <input
              type="text"
              className="edit"
              name="editingField"
              value={editingText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              onBlur={handleBlur}
            />
          )
          : (
            <label
              onDoubleClick={() => setIsEdit(true)}
            >
              {todo.title}
            </label>
          )}

        <button type="button" className="destroy" data-cy="deleteTodo" />
      </div>
    </li>
  );
};
