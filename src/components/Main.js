import React from 'react';
import PropTypes from 'prop-types';
import TodoItems from './TodoItems';

function Main(props) {
  const todoItems = (
    <TodoItems
      sortState={props.sortState}
      todoItemsArr={props.todoItemsArr}
      sortedTodoItemsArr={props.sortedTodoItemsArr}

      handleItem={props.handleItem}
      handleEdit={props.handleEdit}

      todoEditValue={props.todoEditValue}
      handleSubmitEdit={props.handleSubmitEdit}
      handleTypeEdit={props.handleTypeEdit}
      editingId={props.editingId}
    />
  );

  return (
    <section className="main" style={{ display: 'block' }}>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={props.allCompleted}
        onChange={props.handleAllCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {todoItems}
      </ul>
    </section>
  );
}

Main.propTypes = {
  todoItemsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortedTodoItemsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortState: PropTypes.string.isRequired,
  handleItem: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleAllCompleted: PropTypes.func.isRequired,
  allCompleted: PropTypes.bool.isRequired,

  handleTypeEdit: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,

  todoEditValue: PropTypes.string.isRequired,
  editingId: PropTypes.string.isRequired,
};

export default Main;
