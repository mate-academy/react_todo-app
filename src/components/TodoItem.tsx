import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleCompleteTodo = () => {
    const updatedTodos = [...todos];
    const currentTodoIndex
    = updatedTodos.findIndex((elem: Todo) => elem.id === todo.id);
    const newCompleted = !updatedTodos[currentTodoIndex].completed;

    updatedTodos[currentTodoIndex] = {
      ...updatedTodos[currentTodoIndex],
      completed: newCompleted,
    };

    setTodos(updatedTodos);
  };

  const titleField = useRef<HTMLInputElement>(null);

  const handleEditTodo = () => {
    setIsEditing(true);
    setNewTitle(todo.title);

    setTimeout(() => {
      titleField.current?.focus();
    }, 0);
  };

  const handleDeleteTodo = () => {
    setTodos(currentTodos => currentTodos
      .filter(elem => elem.id !== todo.id));
  };

  const handleEditTodoOnBlur = () => {
    if (isEditing) {
      if (newTitle) {
        const updatedTodos = [...todos];
        const currentTodoIndex = updatedTodos
          .findIndex((updatedTodo: Todo) => updatedTodo.id === todo.id);

        if (currentTodoIndex !== -1) {
          updatedTodos[currentTodoIndex] = {
            ...updatedTodos[currentTodoIndex],
            title: newTitle.trim(),
          };

          setTodos(updatedTodos);
        }
      } else {
        handleDeleteTodo();
      }
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEditing) {
      switch (event.key) {
        case 'Escape':
          setIsEditing(false);
          break;

        case 'Enter':
          handleEditTodoOnBlur();
          break;

        default:
          break;
      }
    }
  };

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
          id={`toggle-view${todo.id}`}
          checked={todo.completed}
          onChange={handleCompleteTodo}
        />

        <label onDoubleClick={handleEditTodo}>
          {todo.title}
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
        ref={titleField}
        type="text"
        className="edit"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
        onBlur={handleEditTodoOnBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
