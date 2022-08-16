/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Context } from './Context';
import { Todo } from '../types/Todo';

type Todoitem = {
  todo: Todo,
};

export const TodoItem: React.FC<Todoitem> = ({ todo }) => {
  const { setTodos } = useContext(Context);
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleChange = () => {
    setTodos((currentTodos: Todo[]) => [...currentTodos].map(actualTodo => {
      if (actualTodo.id !== todo.id) {
        return actualTodo;
      }

      return (
        {
          ...actualTodo,
          completed: !todo.completed,
        }
      );
    }));
  };

  const handleClick = () => {
    setTodos((currentTodos: Todo[]) => {
      return (
        [
          ...currentTodos
            .filter((actualTodo: Todo) => actualTodo.id !== todo.id),
        ]);
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { target, key } = event;
    const todoTitle = target.value;

    switch (key) {
      case 'Enter': {
        if (todoTitle.length) {
          setTodos((currentTodos: Todo[]) => [...currentTodos]
            .map(actualTodo => {
              if (actualTodo.id !== todo.id) {
                return actualTodo;
              }

              return (
                {
                  ...actualTodo,
                  title: todoTitle,
                }
              );
            }));

          setEdit(false);
        }

        if (!todoTitle.length) {
          setTodos((currentTodos: Todo[]) => currentTodos
            .filter(actualTodo => (actualTodo.id !== todo.id)));
          setEdit(false);
        }

        break;
      }

      case 'Escape': {
        if (!todoTitle.length) {
          setTodos((currentTodos: Todo[]) => currentTodos
            .filter(actualTodo => (actualTodo.id !== todo.id)));
          setEdit(false);
        }

        if (todoTitle.length) {
          setTodos((currentTodos: Todo[]) => [...currentTodos]
            .map(actualTodo => {
              if (actualTodo.id !== todo.id) {
                return actualTodo;
              }

              return (
                {
                  ...actualTodo,
                  title: todoTitle,
                }
              );
            }));

          setEdit(false);
        }

        break;
      }

      default:

        break;
    }
  };

  return (
    <li className={classNames({
      completed: todo.completed,
      editing: edit,
    })}
    >
      {!edit
        ? (
          <form>
            <div
              className="view"
              onDoubleClick={() => setEdit(true)}
            >
              <input
                type="checkbox"
                className="toggle"
                id="toggle-view"
                checked={todo.completed}
                onChange={handleChange}
              />
              <label>
                {todo?.title}
              </label>
              <button
                type="button"
                className="destroy"
                data-cy="deleteTodo"
                onClick={handleClick}
              />
            </div>
          </form>
        )
        : (
          <>
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id="toggle-editing"
              />
              <button
                type="button"
                className="destroy"
                data-cy="deleteTodo"
              />
            </div>
            <input
              type="text"
              className="edit"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              onKeyUp={handleKeyPress}
            />
          </>
        )}
    </li>
  );
};
