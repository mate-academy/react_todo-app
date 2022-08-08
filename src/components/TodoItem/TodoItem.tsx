import classNames from 'classnames';
import { useState } from 'react';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo,
  toggleTodoStatus: (todoId: number) => void,
  deleteTodo: (todoId: number) => void,
  editTodo: (editedTitle: string, todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleTodoStatus,
  deleteTodo,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const submitHandler = (
    event: React.FocusEvent | React.KeyboardEvent,
  ) => {
    if ('key' in event) {
      if (event.key === 'Enter' || event.key === 'Escape') {
        if (!editText) {
          deleteTodo(todo.id);
        }
      }

      switch (event.key) {
        case 'Enter':
          editTodo(editText, todo.id);
          setIsEditing(false);
          break;

        case 'Escape':
          setEditText(todo.title);
          setIsEditing(false);
          break;

        default:
          break;
      }
    } else {
      if (!editText) {
        deleteTodo(todo.id);
      }

      editTodo(editText, todo.id);
      setIsEditing(false);
    }
  };

  return (
    <>
      <li className={classNames(
        { completed: todo.completed, editing: isEditing },
      )}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={todo.completed}
            onChange={() => toggleTodoStatus(todo.id)}
          />
          <label
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={editText}
          onChange={(event) => setEditText(event.target.value)}
          onKeyUp={submitHandler}
          onBlur={submitHandler}
        />
      </li>
    </>
  );
};

/* <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-completed" />
          <label htmlFor="toggle-completed">test2</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">test3</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">test4</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li> */
