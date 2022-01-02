import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodo: Todo[],
  updateTodoStatus: (todoId: Todo['id'], completed: Todo['completed']) => void,
  updateTodoTitle: (todoId: Todo['id'], title: Todo['title']) => void,
  deleteTodo: (todoId: Todo['id']) => void,
};

export const TodoList: React.FC<Props> = ({
  visibleTodo,
  updateTodoStatus,
  updateTodoTitle,
  deleteTodo,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [isEditing, setIsEditing] = useState(0);

  const editTodoTitle = (event: React.KeyboardEvent, todoId: Todo['id']) => {
    if (event.key === 'Enter') {
      updateTodoTitle(todoId, newTitle);
      setIsEditing(0);
      setNewTitle('');
    } else if (event.key === 'Escape') {
      setIsEditing(0);
      setNewTitle('');
    }
  };

  return (
    <ul className="todo-list">
      {visibleTodo.map(todo => (
        <li
          key={todo.id}
          className={classNames({ completed: todo.completed, editing: isEditing === todo.id })}
          onDoubleClick={(event) => {
            event.preventDefault();
            setIsEditing(todo.id);
          }}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              readOnly
              checked={todo.completed}
              onClick={() => {
                updateTodoStatus(todo.id, !todo.completed);
              }}
            />
            <label htmlFor="#">
              {todo.title}
              <input hidden />
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              x
            </button>
          </div>
          <input
            type="text"
            className="edit"
            value={newTitle || todo.title}
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
            onKeyDown={(event) => {
              editTodoTitle(event, todo.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
};
