import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onChange: (el: number) => void,
  onDelete: (el: number) => void,
  edit: string,
  onEdit: (el: string) => void,
  onChangeName: (
    el: React.KeyboardEvent<HTMLInputElement>,
    currTodo: Todo,
    currValue: string,
  ) => void,
};

// де змінюється туду там сет, там де використовується - гет

export const TodoList: React.FC<Props>
  = ({
    todos,
    onChange,
    onDelete,
    edit,
    onEdit,
    onChangeName,
  }) => {
    const [currInputValue, setCurrInputValue] = useState(edit);

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => (
          <li
            className={cn({
              completed: todo.completed,
              editing: todo.title === edit,
            })}
            key={todo.id}
            onDoubleClick={() => {
              onEdit(todo.title);
              setCurrInputValue(todo.title);
            }}
          >
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                id={`${todo.id}`}
                checked={todo.completed}
                onChange={() => onChange(todo.id)}
              />
              <label>
                {todo.title}
              </label>
              <button
                type="button"
                aria-label="destroy"
                className="destroy"
                data-cy="deleteTodo"
                onClick={() => onDelete(todo.id)}
              />
            </div>
            <input
              type="text"
              className="edit"
              value={currInputValue}
              onChange={event => setCurrInputValue(event.target.value)}
              onKeyUp={event => onChangeName(event, todo, currInputValue)}
              onBlur={() => onEdit('')}
            />
          </li>
        ))}
      </ul>
    );
  };
