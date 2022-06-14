import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../TodoContext';
import { Todo } from '../types';

type Props = {
  el: Todo,
}

export const TodoItem: React.FC<Props> = ({ el }) => {
  const { todo, setTodo } = useContext(TodoContext);
  const [focused, setFocused] = useState(false);
  const [editTodo, setEditTodo] = useState(el.title);

  const updateTodo = () => {
    setTodo(todo.map((elem) => {
      if (elem.id === el.id) {
        return {
          ...elem,
          title: editTodo,
        };
      }

      return elem;
    }));
  };

  const handledoubleClick = () => {
    setFocused(true);
  };

  const handleClick = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setFocused(false);
      updateTodo();
    }

    if (event.key === 'Escape') {
      setEditTodo(el.title);
      setFocused(false);
    }
  };

  const destroyItem = (id: number) => {
    setTodo(todo.filter(elem => elem.id !== id));
  };

  const handleInputTodo = (id: number) => {
    setTodo(todo.map((elem) => {
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
