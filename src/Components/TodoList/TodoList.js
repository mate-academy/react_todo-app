import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import { ShapeTodo } from '../../Shapes/Shapes';

export class TodoList extends Component {
  state = {}

  render() {
    const {
      todosList,
      onChangeCompleted,
      onChangeUpdate,
      onDeleteTodo,
    } = this.props;

    return (
      <ul className="todo-list">
        {todosList.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            onChangeCompleted={onChangeCompleted}
            onDeleteTodo={onDeleteTodo}
            onChangeUpdate={onChangeUpdate}
          />
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  onChangeCompleted: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onChangeUpdate: PropTypes.func.isRequired,
  todosList: PropTypes.arrayOf(ShapeTodo).isRequired,
};
