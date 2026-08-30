import { useEffect, useRef, useState } from 'react';
import { Todo } from '../Types/Todo';
import '../styles/todo-list.scss';
import { useTodoContext } from './TodoContext';

type Props = {
  todo: Todo;
}
export const TodoList: React.FC<Props> = ({ todo }) => {

  const { deleteTodo, handleUpdateTodo } = useTodoContext();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && field.current) {
      field.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!trimmedTitle) {
      deleteTodo(todo.id);

      return;
    }

    handleUpdateTodo(todo.id, { title: trimmedTitle });
    setIsEditing(false);
  };

    const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setNewTitle(todo.title);
      setIsEditing(false);
    }
  }

 return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label
      className="todo__status-label"
      htmlFor={`todo-status-${todo.id}`}
      >

        <input
          id={`todo-status-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          aria-label={`Статус справи: ${todo.title}`}
          onChange={() =>
            handleUpdateTodo(todo.id, { completed: !todo.completed })}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            ref={field}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onBlur={handleSubmit}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodo(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};



