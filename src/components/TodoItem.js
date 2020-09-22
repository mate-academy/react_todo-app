import React from 'react';
import PropTypes from 'prop-types';

export function TodoItem({
  uneditedTitles,
  setUneditedTitles,
  todoList,
  setTodoList,
  todo,
  index,
}) {
  const list = [...todoList];

  return (
    <li
      className={todo.completed ? 'completed' : undefined}
      onDoubleClick={(event) => {
        const clickedTodo = event.target;

        setUneditedTitles({
          ...uneditedTitles,
          [todo.id]: todo.title,
        });
        clickedTodo.closest('li').className = 'editing';
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => {
            list[index].completed = !todo.completed;
            setTodoList([...todoList]);
          }}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            todoList.splice(index, 1);
            setTodoList([...todoList]);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={todo.title}
        onChange={(event) => {
          list[index].title = event.target.value;
          setTodoList([...todoList]);
        }}
        onKeyDown={(event) => {
          const clickedTodo = event.target;

          if (event.key === 'Enter') {
            clickedTodo.closest('li').className
              = todo.completed ? 'completed' : '';
          }

          if (event.key === 'Escape') {
            list[index].title = uneditedTitles[todo.id];
            setTodoList([...todoList]);
            clickedTodo.closest('li').className
              = todo.completed ? 'completed' : '';
          }
        }}
      />
    </li>
  );
}

TodoItem.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  setUneditedTitles: PropTypes.func.isRequired,
  setTodoList: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  uneditedTitles: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};
