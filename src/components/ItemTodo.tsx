/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/types';

type Props = {
  todo: Todo,
  todos: Todo[],
  deleteTodo: (id: any) => void,
  setTodos: (str: Todo[]) => void;
};

export const ItemTodo: React.FC<Props> = ({
  todo, deleteTodo, todos, setTodos,
}) => {
  const [todoName, setTodoName] = useState(todo.title);
  const [edition, setEdition] = useState(false);

  const renameTodo = (title: any, todoo: Todo) => {
    const renameTodos = todos.map(item => {
      if (item.id === todoo.id) {
        return { ...item, title };
      }

      return item;
    });

    setTodos(renameTodos);
  };

  const checketTodo = (event: any, t: any) => {
    const checketTodos = todos.map(item => {
      if (item.id === t.id) {
        return { ...item, completed: event };
      }

      return item;
    });

    setTodos(checketTodos);
  };

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        { view: !todo.completed },
        { editing: edition },
      )}
      onDoubleClick={() => {
        setEdition(!edition);
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={(event) => {
            checketTodo(event.target.checked, todo);
          }}
        />
        <label htmlFor="toggle-view">{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <form onSubmit={(event) => {
        event.preventDefault();
        setEdition(false);
        renameTodo(todoName, todo);
      }}
      >
        <input
          type="text"
          className="edit"
          value={todoName}
          onChange={(event) => {
            event.preventDefault();
            setTodoName(event.target.value);
          }}
        />
      </form>
    </li>
  );
};
