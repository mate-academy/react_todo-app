import React, { useState, useContext } from 'react';
import { TodoContext } from '../hoc/TodoProvider';

export const TodoItem: React.FC<Todo> = ({ id, title, completed }) => {
  const [titleInList, setTitleInList] = useState(title);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(titleInList);
  const content = useContext(TodoContext);
  const todos = content?.todos;
  const setTodos = content?.setTodos;

  const handleCheckbox = (todoId: number) => {
    if (todos && setTodos) {
      setTodos(todos.map(todo => {
        if (todoId === todo.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }));
    }
  };

  const handleDoubleClick = () => {
    setEdit(true);
  };

  const handleClick = () => {
    setEdit(true);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEditValue(event.target.value);
  };

  const editTodo = (todoId: number) => {
    if (todos && setTodos) {
      setTodos(todos.map(todo => {
        if (todoId === todo.id) {
          return {
            ...todo,
            title: editValue,
          };
        }

        return todo;
      }));
    }
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>,
    todoId: number) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setTitleInList(editValue);
      editTodo(todoId);
      setEdit(false);
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setEditValue(titleInList);
      setEdit(false);
    }
  };

  const handleBlur = (todoId: number) => {
    setTitleInList(editValue);
    editTodo(todoId);
    setEdit(false);
  };

  const removeTodo = (todoId: number) => {
    if (todos && setTodos) {
      setTodos(todos.filter(todo => todo.id !== todoId));
    }
  };

  return (
    <li>
      <div className="field is-grouped is-justify-content-space-between">
        <div
          className="field"
          style={{ width: '80%' }}
        >
          <label
            className="field"
            title="done"
            onDoubleClick={handleDoubleClick}
          >
            <span className="icon has-text-primary">
              {completed === false && (
                <i className="fa-regular fa-circle mx-1" />
              )}

              {completed === true && (
                <i className="fa-regular fa-circle-check mx-1" />
              )}
            </span>

            <input
              type="checkbox"
              checked={completed}
              style={{ visibility: 'hidden' }}
              onChange={() => handleCheckbox(id)}
            />

          </label>

          <label
            className="field"
            onDoubleClick={handleDoubleClick}
          >
            {!edit
              ? (
                <>
                  <p
                    style={{
                      width: '80%',
                      display: 'inline-block',
                      textDecoration: completed === true
                        ? 'line-through'
                        : 'none',
                      color: completed === true
                        ? 'grey'
                        : 'black',
                    }}
                  >
                    {titleInList}
                  </p>
                </>
              )
              : (
                <input
                  type="text"
                  value={editValue}
                  className="input is-primary"
                  style={{ width: '80%' }}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeydown(e, id)}
                  onBlur={() => handleBlur(id)}
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
              )}
          </label>
        </div>

        <div className="buttons">
          <button
            type="button"
            className="button icon has-text-info"
            title="edit"
            style={{ border: 'none' }}
            disabled={edit}
            onClick={handleClick}
          >
            <i className="fas fa-solid fa-feather fa-aling-right" />
          </button>

          <button
            type="button"
            className="button icon has-text-danger"
            title="delete"
            style={{ border: 'none' }}
            disabled={edit}
            onClick={() => removeTodo(id)}
          >
            <i className="fas fa-solid fa-circle-xmark fa-aling-right" />
          </button>
        </div>
      </div>
    </li>
  );
};
