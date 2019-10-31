import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.Component {

  filteredTodoList = () => {
    const { activeFilter, todoList } = this.props;
    if (activeFilter === 'active') {
      return todoList
        .filter(todo => todo.status === false)
    } else if (activeFilter === 'completed') {
      return todoList
        .filter(todo => todo.status === true)
    } else {
      return todoList;
    }
  }

  render () {
    const {
      deleteItem,
      chooseFinishTask,
    } = this.props;

    return (
      <ul className="todo-list">
        {this.filteredTodoList().map(todo => {
          return (
          <li className={todo.status === false ? '' : 'completed'} key={todo.id}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={`todo-${todo.id}`}
              checked={todo.status}
              onChange={() => chooseFinishTask(todo.id)}
            />
            <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
            <button type="button" className="destroy" onClick={(event) => deleteItem(event)}/>
          </div>
        </li>
        )})}
      </ul>
    )
  }
}

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
  chooseFinishTask: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired
}

export default TodoList;
