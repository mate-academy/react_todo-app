import React, { ChangeEventHandler, MouseEventHandler, FocusEvent, useEffect, useRef, useState, useContext } from 'react';
import { Todo, TodosContext } from '../TodosContext';
import className from 'classnames';

interface Props {
  todo: Todo,
  changeStatus: ChangeEventHandler,
  removeTodo: MouseEventHandler,
}

export const TodoItem = (props: Props) => {
  const { todos, setTodos } = useContext(TodosContext);
  const { todo, changeStatus, removeTodo } = props;
  const [editTodoId, setEditTodoId] = useState(0);
  const [editValue, setEditValue] = useState(todo.title);
  const inputElement = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  });

  const editTodo = () => {
    setEditTodoId(todo.id);
  }

  const updateTodos = (value: string) => {
    setTodos(todos.map((currTodo) => {
      if (currTodo.id === todo.id) {
        currTodo.title = value;
      }

      return { ...currTodo };
    }));
  };

  const updateValue = () => {
    setEditValue(todo.title);
    setEditTodoId(0);
  };

  const saveEditKeyDown = (event: any) => {
    const { value } = event.target;
    const title = todo.title;

    switch (event.key) {
      case 'Enter':
        value.length
          ? todo.title = value
          : todo.title = title;
  
        updateTodos(value);
        updateValue();
        break;
      case 'Escape':
        todo.title = title;

        updateValue();
        break;
      default:
        return;
    }
  };

  const saveEditBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;

    const title = todo.title;

    value.length
      ? todo.title = value
      : todo.title = title;

    updateTodos(value);
    updateValue();
  };

  return (
    <>
      <li
        id={`${todo.id}`}
        className={className(
          {'completed': todo.completed}, 
          {'editing': todo.id === editTodoId}
        )}
        onDoubleClick={editTodo}
      >
          <div className="view">
            <input
              id={`${todo.id}`}
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={changeStatus}
            />
            <label>
              {todo.title}
            </label>
            <button
              id={`${todo.id}`}
              type="button"
              className="destroy"
              onClick={removeTodo}
            />
          </div>
          <input
            id={`${todo.id}`}
            type="text"
            className="edit"
            value={editValue}
            ref={inputElement}
            onChange={({ target }) => setEditValue(target.value)}
            onKeyDown={saveEditKeyDown}
            onBlur={saveEditBlur}
          />
        </li>
    </>
  );
};
