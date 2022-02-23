import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const checkedTodo = useContext(TodosContext)?.checkedTodo;
  const deleteTodo = useContext(TodosContext)?.deleteTodo;
  const onChangeTodo = useContext(TodosContext)?.onChangeTodo;
  const validationTitle = useContext(TodosContext)?.validationTitle;

  useEffect(() => {
    setTitle(editing ? todo.title : '');
  }, [editing]);

  return (
    <>
      {checkedTodo && deleteTodo && onChangeTodo && validationTitle && (
        <li
          className={classNames({ completed: todo.completed, editing })}
        >
          <div className="view">
            <input
              id={todo.id}
              type="checkbox"
              className="toggle"
              onChange={() => {
                checkedTodo(todo.id);
              }}
              checked={todo.completed}
            />
            <label
              htmlFor={todo.id}
              onDoubleClick={() => {
                setEditing(!editing);
              }}
            >
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              {}
            </button>
          </div>
          <input
            type="text"
            value={title}
            className="edit"
            onChange={({ target }) => {
              if (validationTitle(target.value) !== '') {
                setTitle(validationTitle(target.value));
              }
            }}
            onBlur={(e) => {
              e.preventDefault();
              if (validationTitle(title) !== '') {
                onChangeTodo(todo.id, title);
                setEditing(!editing);
              }
            }}
            onKeyDown={(e) => {
              const { key } = e;

              switch (key) {
                case 'Escape':
                  setEditing(!editing);
                  break;
                case 'Enter':
                  e.preventDefault();
                  if (validationTitle(title) !== '') {
                    onChangeTodo(todo.id, title);
                    setEditing(!editing);
                  }

                  break;
                default:
                  break;
              }
            }}
          />
        </li>
      )}
    </>
  );
};
