import cn from 'classnames';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTodo } from '../../providers/TodosContext';
import { Todo } from '../../utils/todo';
/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    toggleTodo,
    deleteTodo,
    editTodo,
    todos,
  } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const count = todos.filter(t => !t.completed).length;

  const handlerCheckComplete = () => {
    toggleTodo(todo.id);
  };

  const handlerDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  const handlerEditTodo = () => {
    editTodo(todo.id, editTitle);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    editTodo(todo.id, editTitle);
    setIsEditing(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (editTitle === '' && event.key === 'Enter') {
      deleteTodo(todo.id);

      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setEditTitle(todo.title);
      handleSaveEdit();
    }

    if (event.key === 'Enter') {
      handleSaveEdit();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li className={cn({ completed: todo.completed, editing: isEditing })}>
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handlerCheckComplete}
          className="toggle"
          id={`toggle-view${count}`}
        />
        <label onDoubleClick={handlerEditTodo}>{todo.title}</label>
        <button
          type="button"
          data-cy="deleteTodo"
          className="destroy"
          onClick={handlerDeleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editTitle}
        onChange={event => setEditTitle(event.target.value)}
        onKeyDown={handleKeyPress}
        ref={inputRef}
      />
    </li>
  );
};
