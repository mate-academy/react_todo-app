import React from 'react';
import PropsTypes from 'prop-types';

const TodoItem = ({ todo, item, id, changeCompleted, todoState }) => {
  const handleCompleted = () => (
    changeCompleted(todo.map(elem => (
      item === elem
        ? {
          ...elem,
          isCompleted: !item.isCompleted,
        }
        : elem
    )))
  );

  return (
    <li
      className=""
      key={+new Date()}
    >
      <div
        className="view"
      >
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${id}`}
          defaultChecked={item.isCompleted}
          onClick={handleCompleted}
        />
        <p
          htmlFor={`todo-${id}`}
          className={`todo__item
              ${item.isCompleted ? 'label--completed' : ''}`}
        >
          {item.title}
        </p>
        <button
          type="button"
          className="destroy"
          onClick={() => (
            changeCompleted(todoState.filter(elem => (elem !== item)))
          )}
        />
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropsTypes.arrayOf.isRequired,
  changeCompleted: PropsTypes.func.isRequired,
  item: PropsTypes.objectOf.isRequired,
  id: PropsTypes.number.isRequired,
  todoState: PropsTypes.arrayOf.isRequired,
};

export default TodoItem;
