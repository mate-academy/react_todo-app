import {
  useContext, useState, useRef, useEffect,
} from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  item: Todo;
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { id, title, completed } = item;
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const toggleCompleted = () => {
    const updatedTodos = todos.map((todo) => {
      return todo.id === id ? { ...todo, completed: !completed } : todo;
    });

    setTodos(updatedTodos);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (newTitle !== '') {
      const updatedTodos = todos.map((todo) => {
        return todo.id === id ? { ...todo, title: newTitle } : todo;
      });

      setTodos(updatedTodos);
    }

    setIsEditing(false);
  };

  const updateTodos = () => {
    const updatedTodos = todos.map((todo) => {
      return todo.id === id ? { ...todo, title: newTitle } : todo;
    });

    setTodos(updatedTodos);
  };

  const removeTodoById = () => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  const handleKeyAction = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (newTitle === '') {
        removeTodoById();
      } else {
        updateTodos();
      }

      setIsEditing(false);
    }

    if (e.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(title);
    }
  };

  return (
    <li
      className={classNames({
        completed: item.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={toggleCompleted}
        />
        <label onDoubleClick={handleDoubleClick}>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={removeTodoById}
        >
          {' '}
        </button>
      </div>
      <input
        type="text"
        className="edit"
        ref={inputRef}
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyUp={handleKeyAction}
        onBlur={handleBlur}
      />
    </li>
  );
};
