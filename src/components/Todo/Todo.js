import React from 'react';
import PropTypes from 'prop-types';

import View from '../View/View';
import Edit from '../Edit/Edit';

class Todo extends React.PureComponent {
  state = {
    isEditing: false,
  }

  onEdit = () => {
    this.setState({
      isEditing: true,
    });
  }

  offEdit = () => {
    this.setState({
      isEditing: false,
    });
  }

  render() {
    const {
      index,
      item,
      toggleCompleted,
      editTodo,
      destroyTodo,
    } = this.props;

    const {
      isEditing,
    } = this.state;

    return (
      <li
        className={isEditing ? 'editing' : item.completed ? 'completed' : ''}
      >
        <View
          index={index}
          title={item.title}
          id={item.id}
          completed={item.completed}
          toggleCompleted={toggleCompleted}
          onEdit={this.onEdit}
          destroyTodo={destroyTodo}
        />
        <Edit
          title={item.title}
          id={item.id}
          offEdit={this.offEdit}
          editTodo={editTodo}
        />
      </li>
    );
  }
}

export default Todo;

Todo.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
};
