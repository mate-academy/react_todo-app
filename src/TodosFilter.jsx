import React, { useContext, useState, useEffect, useMemo } from "react";
import { TodoContext } from "./TodoContext";
import classNames from 'classnames';

export const TodosFilter = () => {
  let {todos, visibleTodos, setTodo} = useContext(TodoContext);

  const [value, setValue] = useState('All');

  useEffect(() => {
    visibleTodos = [{title: 1}]
  }, []);
let fun = useMemo(() => JSON.parse(localStorage.getItem('todos')), []);
  const handleClick = (event) => {
    const newValue = event.target.innerText;
    setValue(newValue);

    let show;
    console.log(fun);
    switch (newValue) {
      case 'All':
        show = fun;
        break;
      case 'Active':
        show = fun.filter(todo => !todo.completed);
        break;
      case 'Completed':
        show = fun.filter(todo => todo.completed);
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
