import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../utils/TodosContext';

type Props = {
  todo: Todo,
};

function edit(
  isEditing: boolean,
  todos: Todo[],
  todo: Todo,
  newTitle: string,
  setTodos: (t: Todo[]) => void,
  handleDelete: () => void,
) {
  if (isEditing) {
    if (!newTitle.trim()) {
      handleDelete();

      return;
    }

    const copy = [...todos];
    const temp = copy.find(t => t.id === todo.id);

    if (temp) {
      const index = copy.indexOf(temp);

      copy[index].title = newTitle.trim();
    }

    setTodos(copy);
  }
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleTodoCompletedState = () => {
    const copy = [...todos];
    const temp = copy.find(t => t.id === todo.id);

    if (temp) {
      const index = copy.indexOf(temp);

      copy[index].completed = !copy[index].completed;
    }

    setTodos(copy);
  };

  const handleTodoDelete = () => {
    setTodos(todos.filter(t => t.id !== todo.id));
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    edit(isEditing, todos, todo, newTitle, setTodos, handleTodoDelete);
    setNewTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(todo.title);
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      edit(isEditing, todos, todo, newTitle, setTodos, handleTodoDelete);
      setNewTitle(todo.title);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  });

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={handleTodoCompletedState}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={handleTodoDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        ref={inputRef}
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
      />
    </li>
  );
};
