import React, {
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';

type Props = { toDo: Todo };

export const TodoItem:React.FC<Props> = ({ toDo }) => {
  const { updateTodo, deleteTodo } = useContext(TodoContext);
  const [switchEditTodo, setSwitchEditTodo] = useState(false);
  const [newTitle, setNewTitle] = useState('' || toDo.title);
  const todoItemEditRef = useRef<HTMLInputElement | null>(null);
  const { id, title, completed } = toDo;

  useEffect(() => {
    if (switchEditTodo) {
      todoItemEditRef.current?.focus();
    }
  }, [switchEditTodo]);

  const handleUpdateTitle = (todo: Todo) => {
    if (!newTitle.trim()) {
      deleteTodo(id);
      setSwitchEditTodo(false);
    } else {
      updateTodo({
        ...todo,
        title: newTitle.trim(),
        completed: false,
      });
      setSwitchEditTodo(false);
    }
  };

  const handlesToChangeTitle = () => {
    setNewTitle(newTitle);
    handleUpdateTitle(toDo);
  };

  const handleToPreviousTitle = () => {
    setNewTitle(title);
    setSwitchEditTodo(false);
  };

  const handleOnBlur = () => {
    if (newTitle === title) {
      handleToPreviousTitle();
    } else {
      handlesToChangeTitle();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== 'Escape') {
      return;
    }

    if (newTitle === title || e.key === 'Escape') {
      handleToPreviousTitle();
    } else {
      handlesToChangeTitle();
    }
  };

  return (
    <li
      data-id={id}
      className={cn({
        completed: toDo.completed,
        editing: switchEditTodo,
      })}
      key={id}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={(e) => updateTodo({ ...toDo, completed: e.target.checked })}
          checked={completed}
        />

        <label onDoubleClick={() => {
          setSwitchEditTodo(true);
        }}
        >
          {title}
        </label>

        <button
          aria-label="destroy-button"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={todoItemEditRef}
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
        onBlur={handleOnBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
