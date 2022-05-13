import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { changeTodo, deleteTodo } from '../api/api';

// eslint-disable-next-line import/no-cycle
import { TodoContent } from './TodoApp';

export const TodoItem = React.memo(
  ({ item }) => {
    const { setTodos, setToggleAll } = useContext(TodoContent);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const setTodoStatus = (id) => {
      setTodos(curr => curr.map((todo) => {
        if (todo.id === id) {
          if (todo.completed) {
            setToggleAll(false);
          }

          changeTodo(id, { completed: !todo.completed });

          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }));
    };

    const changeTodoTitle = (id) => {
      setTodos(curr => curr.map((todo) => {
        if (todo.id === item.id) {
          changeTodo(id, { title: newTitle });

          return { ...todo, title: newTitle };
        }

        return todo;
      }));
    };

    const removeTodo = (id) => {
      setTodos(curr => curr.filter((todo) => {
        if (todo.id === id) {
          deleteTodo(id);
        }

        return todo.id !== id;
      }));
    };

    return (
      <li
        className={classNames({
          completed: item.completed,
          editing: isEditing,
        })}
        onDoubleClick={() => {
          setIsEditing(true);
        }}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id="toggle-view"
            checked={item.completed}
            onChange={() => {
              setTodoStatus(item.id);
            }}
          />
          <label htmlFor="toggle-view">{item.title}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => {
              removeTodo(item.id);
            }}
          />
        </div>
        {isEditing && (
        <input
          type="text"
          className="edit"
          value={newTitle}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={event => setNewTitle(event.target.value)}
          onBlur={(event) => {
            if (newTitle) {
              changeTodoTitle(item.id);
              setNewTitle('');
              setIsEditing(false);
            } else {
              setNewTitle('');
              setIsEditing(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.code === 'Enter' && newTitle) {
              changeTodoTitle(item.id);
              setNewTitle('');
              setIsEditing(false);
            }

            if (event.code === 'Escape') {
              setNewTitle('');
              setIsEditing(false);
            }
          }}
        />
        )}
      </li>
    );
  },
);
