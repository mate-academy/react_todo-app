/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import {
  useContext, useState, useRef, useEffect,
} from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;
  const { todos, setTodos } = useContext(TodosContext);
  const [editedTitle, setEditedTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const toggleTodo = (todoId: number) => {
    setTodos(todos.map(todoItem => (todoItem.id === todoId
      ? { ...todoItem, completed: !todoItem.completed } : todoItem)));
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter(todoItem => todoItem.id !== todoId));
  };

  const editTodo = (todoId: number, newTitle: string) => {
    setTodos(todos.map(todoItem => (todoItem.id === todoId
      ? { ...todoItem, title: newTitle } : todoItem)));
  };

  const handleEditSubmit = () => {
    if (!editedTitle.trim()) {
      deleteTodo(id);

      return;
    }

    editTodo(id, editedTitle);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter': handleEditSubmit();
        break;
      case 'Escape': handleEditCancel();
        break;
      default: break;
    }
  };

  return (
    <li className={cn({ completed }, { editing: isEditing })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={() => toggleTodo(id)}
        />
        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedTitle}
        onChange={e => setEditedTitle(e.target.value)}
        onBlur={handleEditSubmit}
        onKeyUp={handleKeyUp}
        ref={inputRef}
      />
    </li>
  );
};
