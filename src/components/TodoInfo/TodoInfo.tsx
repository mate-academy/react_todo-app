import classNames from 'classnames';
import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  deleteTodo: (id:number) => void;
  updateTodo: (updatedTodo: Todo) => void;
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  deleteTodo,
  updateTodo,
}) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, [isEditing]);

  const handleTodoDestroy = () => {
    deleteTodo(id);
  };

  const handleCompletedTodo = () => {
    updateTodo({ ...todo, completed: !completed });
  };

  const handleTitle = (e:ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const changeTitleBlur = () => {
    setIsEditing(false);
    if (inputValue === title) {
      return;
    }

    if (inputValue) {
      updateTodo({ ...todo, title: inputValue });
    } else {
      deleteTodo(id);
    }
  };

  const handleTodoEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      changeTitleBlur();
    }

    if (e.key === 'Escape') {
      setInputValue(title);
      setIsEditing(false);
    }
  };

  const handleEditingInputOpen = () => {
    setIsEditing(true);
  };

  return (
    <li
      className={classNames({
        completed,
        editing: isEditing,
      })}
    >
      <div
        className="view"
        onDoubleClick={handleEditingInputOpen}
      >
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleCompletedTodo}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="destroy"
          onClick={handleTodoDestroy}
        />
      </div>
      <input
        ref={inputEl}
        type="text"
        className="edit"
        onChange={handleTitle}
        onBlur={changeTitleBlur}
        onKeyUp={handleTodoEdit}
        value={inputValue}
      />
    </li>
  );
};
