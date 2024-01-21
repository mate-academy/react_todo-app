import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/todo';

type Props = {
  todo: Todo,
  onDelete: (id: number) => void;
  onUpdate: (todo: Todo) => void; // completed
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete = () => { },
  onUpdate = () => { },
}) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const setTodoCompleted = (completed: boolean) => {
    onUpdate({ ...todo, completed });
  };

  const handleCheckboxChange = () => {
    setTodoCompleted(!todo.completed);
  };

  const handleDeleteButtonClick = () => {
    onDelete(todo.id);
  };

  const startEditing = () => {
    setSelectedTodo(todo);
  };

  const finishEditing = () => {
    setSelectedTodo(null);
    // Update the title when finishing editing
    onUpdate({ ...todo, title: editedTitle });
  };

  const handleEditChange = (newTitle: string) => {
    setEditedTitle(newTitle);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      finishEditing();
    }
  };

  const handleEscapePress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditedTitle(todo.title);
      setSelectedTodo(null);
    }
  };

  useEffect(() => {
    if (selectedTodo === todo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedTodo, todo]);

  return (
    <li
      className={cn({
        editing: selectedTodo === todo,
        completed: todo.completed,
        view: !todo.completed && selectedTodo === todo,
      })}
      onDoubleClick={startEditing}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-editing-${todo.id}`}
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete"
          onClick={handleDeleteButtonClick}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedTitle}
        onChange={(e) => handleEditChange(e.target.value)}
        onBlur={finishEditing}
        onKeyDown={handleEnterPress}
        onKeyUp={handleEscapePress}
        ref={inputRef}
      />
    </li>
  );
};

// id = toggle-view toggle-completed, toggle-editing, className=toggle
// li view completed editing
