import React from 'react';
import { TodosListProps } from '../PropTypes/PropTypes';

const TodoList = ({
  todo, isChecked, destroy, checked,
}) => {
  const handleClick = () => isChecked(todo.id);
  const todoDelete = () => destroy(todo.id);

  return (
    <ul className="todo-list">
      <li className="">
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={todo.id}
            onClick={handleClick}
            checked={checked}
          />
          <label htmlFor={todo.id}>{todo.value}</label>
          <button onClick={todoDelete} type="button" className="destroy" />
        </div>
      </li>
    </ul>
  );
};

TodoList.propTypes = TodosListProps;
export default TodoList;
