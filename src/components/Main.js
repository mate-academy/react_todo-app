import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

function Main(props) {
  const todoItems = props.currentArr.map(todo => (
    <TodoItem
      todo={todo}
      key={todo.id}

      handleItem={props.handleItem}
      handleEdit={props.handleEdit}

      todoEditValue={props.todoEditValue}
      handleSubmit={props.handleSubmit}
      handleTypeEdit={props.handleTypeEdit}
      editingId={props.editingId}
    />
  ));

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
  currentArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleItem: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleAllCompleted: PropTypes.func.isRequired,
  allCompleted: PropTypes.bool.isRequired,

  handleTypeEdit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,

  todoEditValue: PropTypes.string.isRequired,
  editingId: PropTypes.string.isRequired,
};

export default Main;
