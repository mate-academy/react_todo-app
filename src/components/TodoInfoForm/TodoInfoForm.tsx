import React,
{
  useEffect,
  useRef,
  useState,
} from 'react';
import { Props } from './Props';

export const TodoInfoForm: React.FC<Props> = ({
  setIsEditing,
  onDelete,
  onUpdate,
  todo,
}) => {
  const [newValue, setValue] = useState(todo.title);

  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl.current?.focus();
  });

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newValue) {
      onDelete(todo.id);
      setIsEditing(false);

      return;
    }

    if (todo.title !== newValue) {
      onUpdate(todo.id, { title: newValue });
    }

    setIsEditing(false);
  };

  const handleKeyDown = (event: { code: string; }) => {
    if (event.code === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <form onSubmit={handleTitleSubmit}>
      <input
        type="text"
        className="todo__title-field"
        value={newValue}
        placeholder="Empty title will be deleted"
        onBlur={handleTitleSubmit}
        onKeyDown={handleKeyDown}
        onChange={((e) => setValue(e.target.value))}
        ref={inputEl}
      />
    </form>
  );
};
