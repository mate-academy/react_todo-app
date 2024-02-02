/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoUpdateContext } from '../TodosProvider/TodosProvider';

interface Props {
  item: Todo;
}

export const TodoItem: React.FC<Props> = (props) => {
  const { item: todo } = props;

  const {
    completeTodo,
    uncompleteTodo,
    editTodo,
    deleteTodo,
  } = useContext(TodoUpdateContext);

  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  let todoStatus = !todo.completed ? 'view' : 'completed';

  if (editing) {
    todoStatus = 'editing';
  }

  function handleCompleted(): void {
    if (!todo.completed) {
      completeTodo(todo.id);
    } else {
      uncompleteTodo(todo.id);
    }
  }

  const handleDoubleClick = (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  ) => {
    if (event.detail === 2) {
      setEditing(true);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const editedTodo: Todo = {
      ...todo,
      title: newTitle.trim(),
    };

    if (e.key === 'Enter') {
      if (todo.title !== editedTodo.title) {
        editTodo(editedTodo);
      }

      setEditing(false);
    }

    if (e.key === 'Escape') {
      setEditing(false);
    }
  };

  return (
    <li className={todoStatus}>
      {!editing && (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-${todoStatus}`}
            onChange={handleCompleted}
            checked={todo.completed}
          />
          <label onClick={handleDoubleClick}>{todo.title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      )}
      {editing && (
        <input
          type="text"
          className="edit"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKey}
        />
      )}
    </li>
  );
};
