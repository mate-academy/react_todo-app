import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodoApp/TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const titleField = useRef<HTMLInputElement>(null);

  const handlerDeleteTodo = () => {
    setTodos(currentTodos => currentTodos
      .filter(elem => elem.id !== todo.id));
  };

  const handlerCompleteTodo = () => {
    const updatedTodos = [...todos];
    const currentTodoIndex = updatedTodos
      .findIndex((elem: Todo) => elem.id === todo.id);

    if (currentTodoIndex !== -1) {
      const newCompleted = !updatedTodos[currentTodoIndex].completed;

      updatedTodos[currentTodoIndex] = {
        ...updatedTodos[currentTodoIndex],
        completed: newCompleted,
      };
      updatedTodos.splice(currentTodoIndex, 1, updatedTodos[currentTodoIndex]);

      setTodos(updatedTodos);
    }
  };

  const handlerEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handlerEditTodo = () => {
    setNewTitle(todo.title);
    setIsEditing(true);

    setTimeout(() => {
      if (titleField.current !== null) {
        titleField.current.focus();
      }
    }, 0);
  };

  const handlerEndEditTodoOnBlur = () => {
    if (isEditing) {
      if (newTitle !== '') {
        const updatedTodos = [...todos];
        const currentTodoIndex = updatedTodos
          .findIndex((elem: Todo) => elem.id === todo.id);

        if (currentTodoIndex !== -1) {
          updatedTodos[currentTodoIndex] = {
            ...updatedTodos[currentTodoIndex],
            title: newTitle.trim(),
          };
          updatedTodos
            .splice(currentTodoIndex, 1, updatedTodos[currentTodoIndex]);

          setTodos(updatedTodos);
        }
      } else {
        setTodos(currentTodos => currentTodos
          .filter(elem => elem.id !== todo.id));
      }
    }

    setIsEditing(false);
  };

  const handlerKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && isEditing) {
      setIsEditing(false);
    } else if (event.key === 'Enter' && isEditing) {
      handlerEndEditTodoOnBlur();
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div
        className="view"
      >
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view${todo.id}`}
          checked={todo.completed}
          onChange={handlerCompleteTodo}
        />
        <label
          onDoubleClick={handlerEditTodo}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={handlerDeleteTodo}
        />
      </div>
      <input
        ref={titleField}
        type="text"
        className="edit"
        value={newTitle}
        onChange={handlerEditTitle}
        onBlur={handlerEndEditTodoOnBlur}
        onKeyUp={handlerKeyUp}
      />
    </li>
  );
};
