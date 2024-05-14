import { useContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, id, completed } = todo;
  const { todos, setTodos } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [changedTitle, setChangedTitle] = useState(title);

  useEffect(() => {
    setChangedTitle(title);
  }, [title]);

  const replaceChangedTodo = (newTodo: Todo) => {
    const index = todos.indexOf(todo);
    const copyOfTodos = [...todos];

    copyOfTodos[index] = newTodo;

    setTodos([...copyOfTodos]);
  };

  const handleChangeOfTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangedTitle(event.target.value);
  };

  const handleDelete = () => {
    const index = todos.findIndex(t => t.id === todo.id);

    if (index !== -1) {
      const copyOfTodos = [...todos];

      copyOfTodos.splice(index, 1);

      setTodos(copyOfTodos);
    }
  };

  const handleChangeSubmit = () => {
    const newTodo = {
      ...todo,
      title: changedTitle.trim(),
    };

    if (newTodo.title !== '') {
      replaceChangedTodo(newTodo);
    } else {
      handleDelete();
    }
  };

  const eventListenerKeyboard = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleChangeSubmit();
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setChangedTitle(title.trim());
    }
  };

  const switchCompleted = () => {
    const newTodo = {
      title: title,
      id: id,
      completed: !completed,
    };

    replaceChangedTodo(newTodo);
  };

  if (isEditing) {
    document.addEventListener('keyup', eventListenerKeyboard);
  } else {
    document.removeEventListener('keyup', eventListenerKeyboard);
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label htmlFor={`checked-${id}`} className="todo__status-label">
        <input
          id={`checked-${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={switchCompleted}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onClick={() => setIsEditing(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={handleChangeSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            autoFocus
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={changedTitle}
            onChange={handleChangeOfTitle}
            onBlur={() => {
              handleChangeSubmit();
              setIsEditing(false);
            }}
          />
        </form>
      )}
    </div>
  );
};
