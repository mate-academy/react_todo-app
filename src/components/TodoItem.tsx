/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/todo';
import { TodosContext } from '../contexts/TodosContext';

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onDelete, onComplete }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const editRef = useRef<HTMLInputElement>(null);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const saveTodo = () => {
    const todosCopy = [...todos];
    const todoIndex = todos.indexOf(todo);
    const chosenTodo = todosCopy[todoIndex];

    if (!editValue) {
      onDelete(todo.id);
    } else {
      chosenTodo.title = editValue;
      setTodos(todosCopy);
      setIsEditing(false);
    }
  };

  const handleEdit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveTodo();
    } else if (event.key === 'Escape') {
      setEditValue(todo.title);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (editRef.current) {
      editRef.current.focus();
    }
  });

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        { editing: isEditing },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className={classNames('toggle', { checked: todo.completed })}
          id={`${todo.id}`}
          onClick={() => onComplete(todo.id)}
        />
        <label onDoubleClick={handleStartEditing}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editValue}
        ref={editRef}
        onChange={event => setEditValue(event.target.value)}
        onBlur={saveTodo}
        onKeyUp={handleEdit}
      />
    </li>
  );
};
