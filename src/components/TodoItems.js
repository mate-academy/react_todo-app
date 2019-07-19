import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoItems = (props) => {
  let currentArr = props.todoItemsArr;

  if (props.sortState === 'Completed' || props.sortState === 'Active') {
    currentArr = props.sortedTodoItemsArr;
  }

  const todoItem = currentArr.map(todo => (
    <TodoItem
      todo={todo}
      key={todo.id}

      handleItem={props.handleItem}
      handleEdit={props.handleEdit}

      todoEditValue={props.todoEditValue}
      handleSubmitEdit={props.handleSubmitEdit}
      handleTypeEdit={props.handleTypeEdit}
      editingId={props.editingId}
    />
  ));

  return (todoItem);
};

TodoItems.propTypes = {
  sortedTodoItemsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleItem: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,

  handleTypeEdit: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,

  todoEditValue: PropTypes.string.isRequired,
  editingId: PropTypes.string.isRequired,
};

export default TodoItems;
