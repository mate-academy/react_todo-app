import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import TodoItem from '../TodoItem/TodoItem';

class TodoList extends React.Component {
  state = { };

  render() {
    const {
      ListofTodo,
      handleCheckboxChange,
      handleDoubleClick,
      handleEditing,
      handleClickDestroy,
      handleLossFocus,
    } = this.props;

    return (
      <ul className="todo-list">
        {ListofTodo.length !== 0
          ? ListofTodo.map(todo => (
            <li
              className={classNames(todo.elementState)}
              key={todo ? todo.id : null}
            >
              <TodoItem
                todo={todo}
                handleCheckboxChange={handleCheckboxChange}
                handleDoubleClick={handleDoubleClick}
                handleEditing={handleEditing}
                handleClickDestroy={handleClickDestroy}
                handleLossFocus={handleLossFocus}
              />
            </li>
          ))
          : <div />
        }
      </ul>
    );
  }
}

TodoList.propTypes = {
  ListofTodo: PropTypes.arrayOf(Object).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleDoubleClick: PropTypes.func.isRequired,
  handleEditing: PropTypes.func.isRequired,
  handleClickDestroy: PropTypes.func.isRequired,
  handleLossFocus: PropTypes.func.isRequired,
};

export default TodoList;
