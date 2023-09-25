/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../interfaces/Todo';
import { TodosContext } from '../../Store';

interface Props {
  item: Todo;
}

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { id, title, completed } = item;
  const { setTodos, setVisibleTodoApp } = useContext(TodosContext);
  const [editTodoStatus, setEditTodoStatus] = useState(false);
  const [todoValue, setTodoValue] = useState(title);
  const todoInput = useRef<HTMLInputElement | null>(null);

  const changeStatus = () => {
    setTodos((prevState) => {
      return prevState.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return { ...todo, completed: !todo.completed };
      });
    });
  };

  const removeTodo = (currentId: number) => {
    setTodos((prevState) => {
      const todos = prevState.filter((todo) => todo.id !== currentId);

      if (todos.length === 0) {
        setVisibleTodoApp(false);
      }

      return todos;
    });
  };

  const editTodo = (detail: number) => {
    const focusInput = () => todoInput.current?.focus();
    let time = 0;

    if (detail !== 2) {
      return;
    }

    setEditTodoStatus(true);
    clearTimeout(time);
    time = window.setTimeout(focusInput, 0);
  };

  const changeTodoTitle = (currentId: number) => {
    setTodos((prevState) => {
      if (!todoValue) {
        return prevState.filter((todo) => todo.id !== currentId);
      }

      return prevState.map((todo) => {
        if (todo.id !== currentId) {
          return todo;
        }

        return { ...todo, title: todoValue };
      });
    });
    setEditTodoStatus(false);
  };

  const toggleTodo = (key: string, currentId: number) => {
    switch (key) {
      case 'Escape':
        setEditTodoStatus(false);
        setTodoValue(title);
        break;
      case 'Enter':
        changeTodoTitle(currentId);
        break;
      default:
        break;
    }
  };

  return (
    <li
      className={cn(
        { completed: completed === true },
        { editing: editTodoStatus === true },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id.toString()}
          checked={completed}
          onChange={changeStatus}
        />
        <label onMouseDown={({ detail }) => editTodo(detail)}>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={todoInput}
        value={todoValue}
        onChange={({ target }) => setTodoValue(target.value)}
        onKeyUp={({ key }) => toggleTodo(key, id)}
        onBlur={() => changeTodoTitle(id)}
      />
    </li>
  );
};
