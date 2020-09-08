import React from 'react';
import PropTypes from 'prop-types';

function Todo({ todo, setTodoList, todoList }) {
  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={'todo-'.concat(todo.id)}
          checked={!todo.isActive}
          onChange={() => {
            setTodoList(todoList
              .map((el) => {
                const newEl = el;

                if (el.id === todo.id) {
                  newEl.isActive = !el.isActive;
                }

                return newEl;
              }));
          }}
        />
        <label htmlFor={'todo-'.concat(todo.id)}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => setTodoList(todoList.filter(td => td.id !== todo.id))}
        />
      </div>
      <input type="text" className="edit" />
    </>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setTodoList: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Todo;
