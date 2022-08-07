/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { response } from '../../api/api';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const [hasEdit, setHasEdit] = useState(0);
  const [countClick, setCountClick] = useState(0);

  const findIndex = (todoId: number) => {
    return todos.findIndex(currTodo => currTodo.id === todoId);
  };

  const handleClickDelete = (todoId: number) => {
    setTodos([
      ...todos.slice(0, findIndex(todoId)),
      ...todos.slice(findIndex(todoId) + 1),
    ]);

    response(`/todos/${todoId}`, { method: 'DELETE' });
  };

  const handleClickEdit = (todoId: number) => {
    setCountClick(countClick + 1);
    if (countClick === 1) {
      setHasEdit(todoId);
      setCountClick(0);
    }
  };

  const handleChangeEdit = (
    event: ChangeEvent<HTMLInputElement>,
    todo: Todo,
  ) => {
    setTodos([
      ...todos.slice(0, findIndex(todo.id)),
      {
        ...todo,
        title: event.target.value,
      },
      ...todos.slice(findIndex(todo.id) + 1),
    ]);
  };

  const handleClickCompleted = (todo: Todo) => {
    response(`/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });

    setTodos([
      ...todos.slice(0, findIndex(todo.id)),
      {
        ...todo,
        completed: !todo.completed,
      },
      ...todos.slice(findIndex(todo.id) + 1),
    ]);
  };

  const handleSubmit = (event: React.SyntheticEvent, todo: Todo) => {
    event.preventDefault();

    response(`/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: todo.title,
      }),
    });

    setHasEdit(0);
  };

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Escape') {
        setHasEdit(0);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={classNames(
            { editing: hasEdit === todo.id },
            { completed: todo.completed },
          )}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => handleClickCompleted(todo)}
            />
            <label
              onClick={() => handleClickEdit(todo.id)}
            >
              {todo.title}
            </label>

            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => handleClickDelete(todo.id)}
            />
          </div>
          <form onSubmit={(event) => handleSubmit(event, todo)}>
            <input
              type="text"
              className="edit"
              value={todo.title}
              onChange={(event) => handleChangeEdit(event, todo)}
            />
          </form>
        </li>
      ))}
    </ul>
  );
};
