/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const {
    deleteTodo,
    toggleTodoStatus,
    editTodoTitle,
    todoEditId,
    setTodoEditId,
  } = useContext(TodosContext);

  const titleInputRef: React.RefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    if (todoEditId === todo.id) {
      titleInputRef.current?.focus();
    }
  }, [todoEditId]);

  const handleEdit = (todoId: number, todoTitle: string) => {
    setTodoEditId(todoId);
    setNewTodoTitle(todoTitle);
  };

  const handleKeyUp = (key: string, todoId: number, todoTitle: string) => {
    if (key === 'Enter' && !newTodoTitle.trim()) {
      deleteTodo(todoId);
      setTodoEditId(null);
      setNewTodoTitle('');
    }

    if (key === 'Enter' && newTodoTitle.trim()) {
      editTodoTitle(todoEditId as number, newTodoTitle);
      setTodoEditId(null);
    }

    if (key === 'Escape') {
      setTodoEditId(null);
      setNewTodoTitle(todoTitle);
    }
  };

  const handleBlur = (todoId: number) => {
    if (!newTodoTitle.trim()) {
      deleteTodo(todoId);
    } else {
      editTodoTitle(todoEditId as number, newTodoTitle);
    }

    setTodoEditId(null);
    setNewTodoTitle('');
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: todo.id === todoEditId,
      })}
    >
      <div className="view">
        <input
          checked={todo.completed}
          type="checkbox"
          className="toggle"
          onChange={() => toggleTodoStatus(todo.id)}
        />
        <label
          onDoubleClick={() => handleEdit(todo.id, todo.title)}
        >
          {todo.title}
        </label>
        <button
          onClick={() => deleteTodo(todo.id)}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        ref={titleInputRef}
        type="text"
        className="edit"
        value={newTodoTitle}
        onChange={event => setNewTodoTitle(event.target.value)}
        onKeyUp={event => handleKeyUp(event.key, todo.id, todo.title)}
        onBlur={() => handleBlur(todo.id)}
      />
    </li>
  );
};
