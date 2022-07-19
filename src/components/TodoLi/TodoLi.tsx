import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types';
import { DeleteTodo } from '../DeleteTodo/DeleteTodo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todo: Todo,
  todos: Todo[],
  todosCallback: (newTodo: Todo[]) => void,
  mainTodos: (todo: any) => void
};

export const TodoLi: React.FC<Props>
= ({ todo, todos, todosCallback, mainTodos }) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(todo.title);

  return (
    <li
      className={classNames({
        completed: todo.completed === true,
      }, { editing: editing === true })}
      onDoubleClick={() => setEditing(true)}
    >
      <div className="view">
        <TodoItem
          todo={todo}
          mainTodos={mainTodos}
        />
        <label htmlFor="toggle-view">{todo.title}</label>
        <DeleteTodo
          todo={todo}
          todos={todos}
          todosCall={todosCallback}
        />
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (input !== '') {
            todo.title = input; /* eslint no-param-reassign: "error" */
          }

          setEditing(false);
        }}
      >
        <input
          type="text"
          className="edit"
          value={input}
          onChange={event => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setEditing(false);
            }
          }}
          onBlur={() => {
            if (input !== '') {
              todo.title = input; /* eslint no-param-reassign: "error" */
            }

            setEditing(false);
          }}
        />
      </form>
    </li>
  );
};
