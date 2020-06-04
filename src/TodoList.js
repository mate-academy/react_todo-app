import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

class TodoList extends React.PureComponent {
  state = {
    todoList: this.props.todoList,
    // allVisible: true,
    // activeVisible: false,
    // completedVisible: false,
  }

  addNewTodo = (newTodo) => {
    this.setState(({ todoList }) => ({
      todoList: [...todoList, newTodo],
    }));
  }

  handleComplete = (event) => {
    if (this.state.todoList
      .find(el => el.id === +event.target.id).completed === false) {
      this.state.todoList
        .find(el => el.id === +event.target.id).completed = true;
      this.setState(({ todoList }) => ({
        todoList: [...todoList],
      }));
    } else {
      this.state.todoList
        .find(el => el.id === +event.target.id).completed = false;
    }
  }

  handleDestroy = (event) => {
    const newArray = this.state.todoList
      .filter(el => el.id !== +event.target.id);

    this.setState(() => ({
      todoList: newArray,
    }));
  }

  generateKey = () => Math.round(Math.random() * 1000000000000)

  render() {
    return (
      <>
        <TodoItem
          newItem={this.addNewTodo}
          todoList={this.state.todoList}
        />
        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {this.state.todoList.map(el => (
              <li key={this.generateKey()}>
                <div className="view">
                  <input
                    type="checkbox"
                    className="toggle"
                    id={el.id}
                    checked={el.completed}
                    onChange={this.handleComplete}
                  />
                  <label
                    htmlFor={this.state.listItemId}
                    className={classNames(el.completed === true
                      ? 'ok'
                      : 'not-ok')}
                  >
                    {el.title}
                  </label>
                  <button
                    type="button"
                    className="destroy"
                    id={el.id}
                    onClick={this.handleDestroy}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            {this.state.todoList.length}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">All</a>
            </li>

            <li>
              <a href="#/active">Active</a>
            </li>

            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>

          <button type="button" className="clear-completed">
            Clear completed
          </button>
        </footer>
      </>
    );
  }
}

export default TodoList;

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
