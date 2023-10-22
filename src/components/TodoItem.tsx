import React, {
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';

type Props = { todo: Todo };

export const TodoItem:React.FC<Props> = ({ todo }) => {
  const { updateTodo, deleteTodo } = useContext(TodoContext);
  const [switchEditTodo, setSwitchEditTodo] = useState(false);
  const [newTitle, setNewTitle] = useState('' || todo.title);
  const todoItemEditRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (switchEditTodo) {
      todoItemEditRef.current?.focus();
    }
  }, [switchEditTodo]);

  const handleUpdateTitle = (tod: Todo) => {
    if (!newTitle.trim()) {
      deleteTodo(todo.id);
      setSwitchEditTodo(false);
    } else {
      updateTodo({ ...tod, title: newTitle.trim() });
      setSwitchEditTodo(false);
    }
  };

  const handlesForUpdateTitle = () => {
    setNewTitle(newTitle);
    handleUpdateTitle(todo);
  };

  const handlesCurrentTitle = () => {
    setNewTitle(todo.title);
    setSwitchEditTodo(false);
  };

  const handleOnBlur = () => {
    if (newTitle === todo.title) {
      handlesCurrentTitle();
    } else {
      handlesForUpdateTitle();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (newTitle === todo.title) {
        handlesCurrentTitle();
      } else {
        handlesForUpdateTitle();
      }
    } else if (e.key === 'Escape') {
      handlesCurrentTitle();
    }
  };

  return (
    <li
      data-id={todo.id}
      className={cn({
        completed: todo.completed,
        editing: switchEditTodo,
      })}
      key={todo.id}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })}
          checked={todo.completed}
        />

        <label onDoubleClick={() => {
          setSwitchEditTodo(true);
        }}
        >
          {todo.title}
        </label>

        <button
          aria-label="destroy-button"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
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
