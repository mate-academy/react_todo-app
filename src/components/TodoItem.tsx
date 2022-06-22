import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../TodoContext';
import { Todo } from '../types';
import './TodoItem.scss';

type Props = {
  el: Todo,
}

export const TodoItem: React.FC<Props> = ({ el }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const [focused, setFocused] = useState(false);
  const [editTodo, setEditTodo] = useState(el.title.trim());

  const updateTodo = () => {
    setTodos(todos.map((elem) => {
      if (elem.id === el.id) {
        return {
          ...elem,
          title: editTodo.trim(),
        };
      }

      return elem;
    }));
  };

  const handledoubleClick = () => {
    setFocused(true);
  };

  const handleClick = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        setFocused(false);
        updateTodo();
        break;
      case 'Escape':
        setEditTodo(el.title.trim());
        setFocused(false);
        break;
      default:
    }
  };

  const destroyItem = (id: number) => {
    setTodos(todos.filter(elem => elem.id !== id));
  };

  const handleInputTodo = (id: number) => {
    setTodos(todos.map((elem) => {
      if (elem.id === id) {
        return {
          ...elem,
          completed: !elem.completed,
        };
      }

      return elem;
    }));
  };

  const handleOnBlur = () => {
    setFocused(false);
    updateTodo();
  };

  return (
    <>
      <li
        key={el.id}
        className={classNames({
          completed: el.completed,
          editing: focused,
        })}
      >
        <div className="view">
          <input
            type="checkbox"
            checked={el.completed}
            onChange={() => handleInputTodo(el.id)}
            className="toggle"
          />
          <label
            onDoubleClick={handledoubleClick}
          >
            {el.title}
          </label>
          <button
            type="button"
            data-cy="deleteTodo"
            className="destroy"
            onClick={() => destroyItem(el.id)}
          />
        </div>
        <input
          type="text"
          id="editTodo"
          value={editTodo}
          onChange={e => setEditTodo(e.target.value)}
          className="edit"
          ref={input => input && input.focus()}
          onBlur={handleOnBlur}
          onKeyDown={handleClick}
        />
      </li>
    </>
  );
};
