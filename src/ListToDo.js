import React from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';

const ListToDo = (props) => {
  const { todos,
    handleEditFieldChange,
    deleteToDo,
    handleIsActiveChange,
    handleItemDoubleClick,
    handleEditEnter } = props;

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <ToDoItem
          todo={todo}
          handleIsActiveChange={handleIsActiveChange}
          deleteToDo={deleteToDo}
          handleItemDoubleClick={handleItemDoubleClick}
          handleEditEnter={handleEditEnter}
          handleEditFieldChange={handleEditFieldChange}
        />
      ))
      }
    </ul>
  );
};

ListToDo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    isEdited: PropTypes.bool.isRequired,
  })).isRequired,
  handleIsActiveChange: PropTypes.func.isRequired,
  deleteToDo: PropTypes.func.isRequired,
  handleItemDoubleClick: PropTypes.func.isRequired,
  handleEditEnter: PropTypes.func.isRequired,
  handleEditFieldChange: PropTypes.func.isRequired,
};

export default ListToDo;
