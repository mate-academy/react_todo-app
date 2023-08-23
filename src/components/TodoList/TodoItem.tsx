import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../store/TodosContext';

type Props = {
  currentTodo: Todo;
};

export const TodoItem: React.FC<Props> = ({ currentTodo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState(currentTodo.title);
  const [isDbCclicked, setIsDbClicked] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { id, title, completed } = currentTodo;

  const handleDbClick = () => setIsDbClicked(true);

  const hendleUpdateStatus = () => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !completed };
      }

      return todo;
    }));
  };

  const handleDeleteTodo = () => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const saveNewTitle = () => {
    setIsDbClicked(false);

    if (!newTitle.trim()) {
      handleDeleteTodo();

      return;
    }

    if (newTitle === title) {
      return;
    }

    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }

      return todo;
    }));
  };

  const hahdleBlur = () => saveNewTitle();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setIsDbClicked(false);
    }

    if (event.key === 'Enter') {
      saveNewTitle();
    }
  };

  useEffect(() => {
    if (isDbCclicked && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDbCclicked]);

  return (
    <li
      className={classNames({
        completed,
        editing: isDbCclicked,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onClick={hendleUpdateStatus}
        />
        <label onDoubleClick={handleDbClick}>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        type="text"
        ref={inputRef}
        className="edit"
        value={newTitle}
        placeholder="Empty todo will be removed"
        onChange={handleTitleChange}
        onBlur={hahdleBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
