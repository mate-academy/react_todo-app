import React, { useContext, useState, useEffect, useMemo } from "react";
import { TodoContext } from "./TodoContext";
import classNames from 'classnames';

export const TodosFilter = () => {
  let {todos, visibleTodos, setTodo} = useContext(TodoContext);

  const [value, setValue] = useState('All');

  useEffect(() => {
    visibleTodos = todos
  }, []);

  let todosFromStorage = useMemo(() => JSON.parse(localStorage.getItem('todos')), []);
  console.log(todosFromStorage);
  // let todosFromStorage = JSON.parse(localStorage.getItem('todos'))
  const handleClick = (event) => {
    const newValue = event.target.innerText;
    setValue(newValue);

    let show;
    console.log(todosFromStorage);
    switch (newValue) {
      case 'All':
        show = todosFromStorage;
        break;
      case 'Active':
        show = todosFromStorage.filter(todo => !todo.completed);
        break;
      case 'Completed':
        show = todosFromStorage.filter(todo => todo.completed);
        break;
    };
    setTodo(show)

  }

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({'selected': value === 'All'})}
          onClick={handleClick}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({'selected': value === 'Active'})}
          onClick={handleClick}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({'selected': value === 'Completed'})}
          onClick={handleClick}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
