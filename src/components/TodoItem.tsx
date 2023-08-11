import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useTodo } from '../hooks/useTodo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { todos, setTodos, setIsChecked } = useTodo();
  const [title, setTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const [focus, setFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const checkTodo = (todoId: number): void => {
    const updatedTodos = todos.map(item => (
      item.id === todoId
        ? { ...item, completed: !item.completed }
        : item));

    setTodos(updatedTodos);
    setIsChecked(updatedTodos.every(item => item.completed));
  };

  function deleteTodo(todoId: number): void {
    const filteredTodos = todos
      .filter(item => item.id !== todoId);

    setTodos(filteredTodos);
  }

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
    setFocus(true);
  }, [isEditing]);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  const handleBlur = () => {
    const newTitle = title.trim();

    if (!newTitle) {
      deleteTodo(todo.id);

      return;
    }

    setTodos(todos.map(item => (
      item.id === todo.id
        ? {
          ...todo,
          title: newTitle,
        }
        : item)));

    setTitle(newTitle);
    setIsEditing(false);
    setFocus(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle(todo.title);
      setIsEditing(false);
      setFocus(false);
    }

    if (event.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <li className={classNames({
      completed: todo.completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => checkTodo(todo.id as number)}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          aria-label="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="edit no-outline"
        value={title}
        onChange={event => setTitle(event.target.value)}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
});
