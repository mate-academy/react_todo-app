import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

class TodoList extends React.Component {
  state = {
    isToggleOn: true,
  }

  handleClick = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));

    this.props.onAllSelected(this.state.isToggleOn);
  }

  render() {
    const {
      todos,
      onTodoChecked,
      deleteTodo,
      saveChangesTodo,
      // selectEditField,
    } = this.props;

    return (
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={this.props.completedStatus}
          value={this.state.isToggleOn}
          onChange={this.handleClick}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todos.map(todo => (
            <Todo
              {...todo}
              key={todo.id}
              onSelected={e => onTodoChecked(todo.id, e)}
              deleteTodo={() => deleteTodo(todo.id)}
              saveChangesTodo={e => (
                saveChangesTodo(e, todo.id, this.state.value)
              )}

            />
          ))}
        </ul>
      </section>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  completedStatus: PropTypes.bool.isRequired,
  onAllSelected: PropTypes.func.isRequired,
  onTodoChecked: PropTypes.func.isRequired,
  saveChangesTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  deleteTodo: null,
  saveChangesTodo: () => {},
};

export default TodoList;
