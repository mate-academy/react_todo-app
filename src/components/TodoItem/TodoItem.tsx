import cn from 'classnames';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../Context';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const { id, completed, title } = todo;

  const [isAdding, setIsAdding] = useState(false);
  const [addedTitle, setAddedTitle] = useState(title);

  const todoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoField.current) {
      todoField.current.focus();
    }
  }, [isAdding]);

  const handleDelete = () => setTodos(
    todos.filter(el => el.id !== id),
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddedTitle(e.target.value);
  };

  const handleOnEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsAdding(false);
      setAddedTitle(title);
    }
  };

  const aditFunc = (str: string) => {
    const trimmedTitle = str.trim();

    if (!trimmedTitle) {
      handleDelete();

      return;
    }

    setTodos(todos.map(el => (el.id === id
      ? { ...el, title: trimmedTitle }
      : el)));

    setIsAdding(false);
  };

  const handleOnBlur = () => {
    aditFunc(addedTitle);
  };

  const handleOnKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    aditFunc(addedTitle);
  };

  const handleToggleChange = () => setTodos(todos.map(el => (el.id === id
    ? ({ ...el, completed: !completed })
    : el)));

  return (
    <li className={cn({
      completed,
      editing: isAdding,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleToggleChange}
        />
        <label
          onDoubleClick={() => setIsAdding(true)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={handleDelete}
        />
      </div>
      <input
        ref={todoField}
        type="text"
        className="edit"
        value={addedTitle}
        onChange={handleOnChange}
        onKeyUp={handleOnEscape}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeydown}
      />
    </li>
  );
};
