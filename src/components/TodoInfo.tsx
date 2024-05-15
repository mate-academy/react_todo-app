import { useContext, useState } from 'react';
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
    const copyOfTodos = todos.filter(t => t.id !== todo.id);

    setTodos(copyOfTodos);
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
            onKeyUp={() =>
              document.addEventListener('keyup', eventListenerKeyboard)
            }
          />
        </form>
      )}
    </div>
  );
};
