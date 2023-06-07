import classNames from 'classnames';
import {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  toggleCompletedStatus: (
    todoIds: number[],
    data: Pick<Todo, 'completed'>,
  ) => void;
  onTodoDelete: (todoIds: number[]) => void;
  handleTitleChange: (todoId: number, title: string) => void;
};

export const TodoItem: FC<Props> = ({
  todo,
  toggleCompletedStatus,
  onTodoDelete,
  handleTitleChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodoValue, setUpdatingTodoValue] = useState(todo.title);
  const selectedTodoField = useRef<HTMLInputElement>(null);

  const handleCheckbox = () => {
    toggleCompletedStatus([todo.id], { completed: !todo.completed });
  };

  const handleOnDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTodoEdition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatingTodoValue(event.target.value);
  };

  const handleChangingTitle = () => {
    if (updatedTodoValue.length === 0) {
      onTodoDelete([todo.id]);
      setIsEditing(false);

      return;
    }

    handleTitleChange(todo.id, updatedTodoValue);
    setIsEditing(false);
  };

  const handleSavingTitle = (event: React.KeyboardEvent) => {
    const { key } = event;

    if (key === 'Enter') {
      handleChangingTitle();

      return;
    }

    if (key === 'Escape') {
      setUpdatingTodoValue(todo.title);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (selectedTodoField.current) {
      selectedTodoField.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        { editing: isEditing },
      )}
      onDoubleClick={handleOnDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={handleCheckbox}
          data-inputid={todo.id}
          checked={todo.completed}
        />
        <label
          data-inputid={todo.id}
        >
          {updatedTodoValue}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={() => onTodoDelete([todo.id])}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={updatedTodoValue}
        onChange={handleTodoEdition}
        onKeyDown={handleSavingTitle}
        ref={selectedTodoField}
        onBlur={handleChangingTitle}
      />
    </li>
  );
};
