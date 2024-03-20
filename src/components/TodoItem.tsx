import { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { StateContext } from './TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;
  const [editedTitle, setEditedTitle] = useState(title);
  const [isEdited, setIsEdited] = useState(false);
  const { todos, setTodos } = useContext(StateContext);

  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEdited && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isEdited]);

  const handleRemoveTodo = () => {
    setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
  };

  const handleSaveTodoTitle = () => {
    if (editedTitle.trim()) {
      setTodos(
        todos.map(t => (t.id === todo.id ? { ...t, title: editedTitle } : t)),
      );
      setIsEdited(false);
    } else {
      handleRemoveTodo();
    }
  };

  const handleCompleted = () => {
    setTodos(
      todos.map(t =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  const handlerKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setEditedTitle(title);
      setIsEdited(false);
    }

    if (e.key === 'Enter') {
      handleSaveTodoTitle();
    }
  };

  return (
    <li
      key={todo.id}
      className={cn({
        completed: completed === true,
        editing: isEdited,
      })}
    >
      <div className="view" onDoubleClick={() => setIsEdited(true)}>
        <input
          type="checkbox"
          id={`todo-${todo.id}`}
          className="toggle"
          checked={completed}
          onChange={handleCompleted}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="delete"
          onClick={handleRemoveTodo}
        />
      </div>
      <input
        type="text"
        id={`todo-${todo.id}`}
        className="edit"
        value={editedTitle}
        onChange={e => setEditedTitle(e.target.value)}
        onKeyUp={handlerKeyUp}
        onBlur={handleSaveTodoTitle}
      />
    </li>
  );
};
