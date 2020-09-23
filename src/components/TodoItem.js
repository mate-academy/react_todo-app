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

  const handleDoubleClick = (event) => {
    const clickedTodo = event.target;

    setUneditedTitles({
      ...uneditedTitles,
      [todo.id]: todo.title,
    });
    clickedTodo.closest('li').className = 'editing';
    clickedTodo.closest('li').lastChild.focus();
  };

  const handleToggle = () => {
    const switchedTodo = todo;

    switchedTodo.completed = !todo.completed;
    setTodoList([...todoList]);
  };

  const handleDestroy = () => {
    todoList.splice(index, 1);
    setTodoList([...todoList]);
  };

  const handleEdit = (event) => {
    list[index].title = event.target.value;
    setTodoList([...todoList]);
  };

  const handleKeyDown = (event) => {
    const clickedTodo = event.target;

    if (event.key === 'Enter') {
      if (!event.target.value.trim()) {
        todoList.splice(index, 1);
        setTodoList([...todoList]);
      } else {
        clickedTodo.closest('li').className
          = todo.completed ? 'completed' : '';
      }
    }

    if (event.key === 'Escape') {
      list[index].title = uneditedTitles[todo.id];
      setTodoList([...todoList]);
      clickedTodo.closest('li').className
        = todo.completed ? 'completed' : '';
    }
  };

  const handleBlur = ({ target }) => {
    const field = target;

    field.closest('li').className
      = todo.completed ? 'completed' : '';
  };

  return (
    <li
      className={todo.completed ? 'completed' : undefined}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={handleDestroy}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={todo.title}
        onChange={handleEdit}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
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
