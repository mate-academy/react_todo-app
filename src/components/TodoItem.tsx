import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/todo';

type Props = {
  todo: Todo
  todos: Todo[]
  setTodos: (todo: Todo[]) => void
  deleteTodo: (id: string) => void
  toggleTodoStatus: (id: string) => void
};

export const TodoItem: React.FC<Props> = ({
  todos,
  todo,
  deleteTodo,
  toggleTodoStatus,
  setTodos,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const changeTitle = (newTitle: string) => {
    const updatedTodos = todos.map(prevTodo => (prevTodo.id === todo.id
      ? { ...todo, title: newTitle }
      : prevTodo));

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const makeNotEditing = (e: React.KeyboardEvent | string) => {
    if (e === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <li
      key={todo.id}
      className={
        classNames('todo', { completed: todo.completed })
      }
    >
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          onChange={() => toggleTodoStatus(todo.id)}
        />
        <label>
          {isEditing
            ? (
              <input
                className="todo"
                value={todo.title}
                onClick={() => setIsEditing(true)}
                onChange={(e) => (changeTitle(e.target.value))}
                onKeyDown={(e) => makeNotEditing(e.key)}
                onBlur={() => makeNotEditing('Blur')}
              />
            )
            : <div className="todo">{todo.title}</div>}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete todo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>

      <input type="text" className="edit" />
    </li>
  );
};
