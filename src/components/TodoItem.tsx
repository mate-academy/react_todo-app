import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../models/Todo';
import { TodoContext } from '../context/todo.context';

type TodoItemProps = {
  todo: Todo
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const {
    toggleCompletedTodo,
    removeTodo,
    handleEdit,
  } = useContext(TodoContext);

  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const editTodoTitle = () => {
    if (todo.title === newTitle) {
      return;
    }

    if (!newTitle) {
      removeTodo(todo.id);

      return;
    }

    const newTodo: Todo = {
      ...todo,
      title: newTitle,
    };

    setNewTitle(newTodo.title);
    handleEdit(newTodo);
  };

  const handleEditTodoTitle = (
    event?: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (!event || event.key === 'Enter') {
      editTodoTitle();
      setEditMode(false);
    }
  };

  useEffect(() => {
    const cancelEdit = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNewTitle(todo.title);
        setEditMode(false);
      }
    };

    document.addEventListener('keyup', cancelEdit);

    return () => {
      document.removeEventListener('keyup', cancelEdit);
    };
  }, []);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  return (
    <li
      className={cn({
        editing: editMode,
        completed: todo.completed,
      })}
      onDoubleClick={() => setEditMode(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={() => toggleCompletedTodo(todo.id)}
          checked={todo.completed}
        />
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <label
          htmlFor="toggle-view"
          onClick={event => event.preventDefault()}
        >
          {todo.title}
        </label>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
      {
        editMode && (
          <input
            ref={inputRef}
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            onBlur={() => handleEditTodoTitle()}
            type="text"
            className="edit"
            onKeyDown={handleEditTodoTitle}
          />
        )
      }
    </li>
  );
};

export default TodoItem;
