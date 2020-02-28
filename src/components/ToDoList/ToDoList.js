import React from 'react';
import PropTypes from 'prop-types';
import ToDoItem from '../ToDoItem/ToDoItem';

function ToDoList({ list, markComplete, deleteItem }) {
  return (
    <ul className="todo-list">
      {list.map(({ title, completed, idToDo }) => (
        <ToDoItem
          mark={markComplete}
          id={idToDo}
          title={title}
          completed={completed}
          key={idToDo}
          deleteItem={deleteItem}
        />
      ))}
    </ul>
  );
}

ToDoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  markComplete: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default ToDoList;
