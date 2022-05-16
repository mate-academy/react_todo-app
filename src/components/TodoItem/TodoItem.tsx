import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodos } = useContext(TodosContext);
  const [editableTitle, setEditableTitle] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo.title);

  const handleTitleChange = (newTitle = '') => {
    setTodos((prevTodos: Todo[]) => (
      [...prevTodos].map(item => {
        if (item.id !== todo.id) {
          return item;
        }

        if (newTitle) {
          return {
            ...item,
            title: newTitle,
          };
        }

        return {
          ...item,
          completed: !todo.completed,
        };
      })
    ));
  };

  const removeTodo = () => {
    setTodos((prevTodos: Todo[]) => (
      [...prevTodos].filter(item => (
        item.id !== todo.id
      ))
    ));
  };

  const editTitle = () => {
    setEditableTitle(true);
  };

  const saveEditedTodo = (key: string) => {
    if ((!editedTodo && key === 'Enter') || (!editedTodo && key === 'Blur')) {
      removeTodo();
    }

    switch (key) {
      case 'Blur':
      case 'Enter':
        handleTitleChange(editedTodo);
        setEditableTitle(false);
        break;

      case 'Escape':
        setEditedTodo(todo.title);
        setEditableTitle(false);
        break;

      default:
    }
  };

  return (
    <li
      className={classNames('todo-list__item', { completed: todo.completed === true }, { editing: editableTitle })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => (
            handleTitleChange()
          )}
          checked={todo.completed}
        />
        <label
          onDoubleClick={editTitle}
        >
          {todo.title}
        </label>
        <button
        data-cy="deleteTodo"
          type="button"
          className="destroy"
          aria-label="button-destroy"
          onClick={removeTodo}
        />
      </div>
      {editableTitle && (
        <input
        id="editTodo"
          type="text"
          className="edit"
          value={editedTodo}
          // eslint-disable-next-line
          autoFocus
          onChange={(event) => (
            setEditedTodo(event.target.value.trimLeft())
          )}
          onKeyDown={({ key }) => (
            saveEditedTodo(key)
          )}
          onBlur={() => (
            saveEditedTodo('Blur')
          )}
        />
      )}
    </li>
  );
};
