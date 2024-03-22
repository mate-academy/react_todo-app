import classNames from 'classnames';
import { DispatchContext, Todo, Type } from '../../store/Store';
import { useContext, useEffect, useRef, useState } from 'react';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handleTodoDelete = (todoId: number) => {
    dispatch({
      type: Type.Remove,
      id: todoId,
    });
  };

  const handleSetChecked = () => {
    dispatch({
      type: Type.Toggle,
      id: todo.id,
    });
  };

  const handleEdit = (currentTodo: Todo) => {
    setEditedTodo(currentTodo);
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedTodo) {
      dispatch({
        type: Type.Editing,
        id: editedTodo.id,
        newText: event.target.value,
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (todo.title.trim() === '') {
        return;
      }

      setEditedTodo(null);
      setIsEditing(false);
    } else if (event.key === 'Escape') {
      if (editedTodo) {
        dispatch({
          type: Type.Editing,
          id: editedTodo.id,
          newText: editedTodo.title,
        });
        setIsEditing(false);
      }
    }
  };

  const handleInputBlur = () => {
    if (todo.title.trim() === '') {
      return;
    }

    setEditedTodo(null);
    setIsEditing(false);
  };

  return (
    <li
      className={classNames('', {
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      {isEditing && editedTodo ? (
        <input
          ref={titleField}
          type="text"
          className="edit"
          value={todo.title}
          onChange={handleTitleChange}
          onKeyDown={handleKeyPress}
          onBlur={handleInputBlur}
        />
      ) : (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={handleSetChecked}
          />
          <label onDoubleClick={() => handleEdit(todo)}>{todo.title}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => handleTodoDelete(todo.id)}
          />
        </div>
      )}
    </li>
  );
};
