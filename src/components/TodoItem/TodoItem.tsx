/* eslint-disable */
import classNames from 'classnames';
import React, {
  FormEvent, useContext, useEffect, useRef, useState,
} from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEdited, setIsEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdited]);

  const handleClickEsc = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditedTitle(todo.title);
      setIsEdited(false);
    }
  };

  const updateTodoHandler = (todoId: number, data: {}) => {
    const newTodos: Todo[] = todos.map(t => {
      if (t.id === todoId) {
        return {
          ...t,
          ...data,
        };
      }

      return t;
    });

    setTodos(newTodos);
    setIsEdited(false);
  };

  const removeTodoHandler = (todoId: number) => {
    const newTodos: Todo[] = todos.filter(t => t.id !== todoId);

    setTodos(newTodos);
  };

  const toggleComplete = (todoId: number) => {
    updateTodoHandler(todoId, { completed: !todo.completed });
  };

  const changeTodoTitle = () => {
    if (todo.title === editedTitle) {
      setIsEdited(false);

      return;
    }

    /* eslint-disable-next-line */
    editedTitle.trim() === ''
      ? removeTodoHandler(todo.id)
      : updateTodoHandler(todo.id, { title: editedTitle });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    changeTodoTitle();
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEdited,
      })}
      onDoubleClick={() => setIsEdited(true)}
    >
      <div className="view">
        {!isEdited ? (
          <>
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />

            <label>
              {todo.title}
            </label>

            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => removeTodoHandler(todo.id)}
            />
          </>
        ) : (
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              className="edit"
              ref={inputRef}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={changeTodoTitle}
              onKeyUp={handleClickEsc}
            />
          </form>
        )}
      </div>
    </li>
  );
};
