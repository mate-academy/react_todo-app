/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { response } from '../../api/api';
import { Condition } from '../../types/Condition';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const { condition } = useParams();
  const [itemEditId, setItemEdit] = useState(0);
  const [title, setTitle]
  = useState('');

  const filterTodos = (condit = '') => {
    switch (condit) {
      case Condition.completed:
        return todos.filter(todo => todo.completed);
      case Condition.active:
        return todos.filter(todo => !todo.completed);
      default:
        return [...todos];
    }
  };

  const findIndex = (todoId: number) => {
    return todos.findIndex(currTodo => currTodo.id === todoId);
  };

  const handlerClickDelete = (todoId: number) => {
    setTodos([
      ...todos.slice(0, findIndex(todoId)),
      ...todos.slice(findIndex(todoId) + 1),
    ]);

    response(`/todos/${todoId}`, { method: 'DELETE' });
  };

  const handlerClickCompleted = (todo: Todo) => {
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

  const handlerSubmit = (event: React.SyntheticEvent, todo: Todo) => {
    event.preventDefault();

    setTodos([
      ...todos.slice(0, findIndex(todo.id)),
      {
        ...todo,
        title,
      },
      ...todos.slice(findIndex(todo.id) + 1),
    ]);

    response(`/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
      }),
    });

    setItemEdit(0);
  };

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Escape') {
        setItemEdit(0);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <ul className="todo-list" data-cy="todoList">
      {filterTodos(condition).map((todo) => (
        <li
          key={todo.id}
          className={classNames(
            { editing: itemEditId === todo.id },
            { completed: todo.completed },
          )}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => handlerClickCompleted(todo)}
            />
            <label
              onClick={() => setItemEdit(todo.id)}
            >
              {todo.title}
            </label>

            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => handlerClickDelete(todo.id)}
            />
          </div>
          <form onSubmit={(event) => handlerSubmit(event, todo)}>
            <input
              type="text"
              className="edit"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </form>
        </li>
      ))}
    </ul>
  );
};
