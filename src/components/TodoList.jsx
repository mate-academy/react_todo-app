import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

export const TodoList = ({
  all,
  active,
  complited,
  currentListToDo,
  setCurrentListToDo,
}) => {
  const [togglerTodo, setTogglerTodo] = useState(false);
  const [isedit, setIsEdit] = useState(0);
  const [tempTitle, setTempTitle] = useState('');
  let currentList = currentListToDo;

  if (active) {
    currentList = currentListToDo
      .filter(item => item.isCompleated === false);
  }

  if (complited) {
    currentList = currentListToDo
      .filter(item => item.isCompleated === true);
  }

  const togglerIsCompleated = (id) => {
    currentListToDo.forEach((element) => {
      if (element.id === id) {
        // eslint-disable-next-line no-param-reassign
        element.isCompleated = togglerTodo;
      }
    });

    setCurrentListToDo([...currentListToDo]);
  };

  const deleteTodo = (id) => {
    let index;

    currentListToDo.forEach((element, i) => {
      if (element.id === id) {
        index = i;
      }
    });

    currentListToDo.splice(index, 1);

    setCurrentListToDo([...currentListToDo]);
  };

  const editTitle = (id) => {
    currentListToDo.forEach((element) => {
      if (element.id === id) {
        // eslint-disable-next-line no-param-reassign
        element.title = tempTitle;
      }
    });

    setCurrentListToDo([...currentListToDo]);
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        // call submit function here
        editTitle(isedit);
        setIsEdit(0);
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [tempTitle]);

  return (
    <ul className="todo-list" data-cy="todoList">
      {currentList.map(item => (
        <li
          key={item.id}
          className={classnames({
            completed: item.isCompleated,
            editing: isedit === item.id,
          })}
        >
          <div className="view">
            <input
              type="checkbox"
              checked={item.isCompleated}
              className="toggle"
              onChange={() => {
                setTogglerTodo(!togglerTodo);
                togglerIsCompleated(item.id);
              }}
            />
            <label
              onDoubleClick={() => {
                setIsEdit(item.id);
                setTempTitle(item.title);
              }}
            >
              {item.title}
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => {
                deleteTodo(item.id);
              }}
            />
          </div>
          <input
            type="text"
            id={item.id}
            className="edit"
            value={tempTitle}
            onChange={(event) => {
              setTempTitle(event.target.value);
            }}
          />
        </li>
      ))}
    </ul>
  );
};
