import React from 'react';
import PropTypes from 'prop-types';
import FILTER_TYPES from './filterTypes';

class LayoutMain extends React.Component {
  deleteDo = (e) => {
    const { id } = e.target.dataset;

    this.props.destroyElement(id);
  }

  checkDo = (e) => {
    const { id } = e.target.dataset;

    this.props.checkDone(id);
  }

  allIsDone = () => {
    this.props.allDone();
  }

  render() {
    let { listOfTodos } = this.props.getTodos();

    if (this.props.getTodos().currentFilter === FILTER_TYPES.active) {
      listOfTodos = listOfTodos.filter(todo => todo.isDone === false);
    }

    if (this.props.getTodos().currentFilter === FILTER_TYPES.all) {
      const list = this.props.getTodos().listOfTodos;

      listOfTodos = list;
    }

    if (this.props.getTodos().currentFilter === FILTER_TYPES.completed) {
      listOfTodos = listOfTodos.filter(todo => todo.isDone === true);
    }

    const completedIds = (
      listOfTodos.filter(todo => todo.isDone === true).map(todo => todo.id)
    );
    const labelText = 'Mark all as complete';

    return (
      <section className="main" style={{ display: 'block' }}>
        <input
          type="checkbox"
          id="toggle-all"
          className={listOfTodos.length > 0 ? 'toggle-all' : 'not-display'}
          checked={listOfTodos.length === completedIds.length
            && listOfTodos.length !== 0}
          onChange={this.allIsDone}
        />
        <label
          htmlFor="toggle-all"
          className={listOfTodos.length > 0 ? 'label' : 'not-display label'}
        >
          {labelText}
        </label>
        <ul className="todo-list">
          {
            listOfTodos.map(todo => (
              <li
                key={todo.id}
                className={completedIds.includes(todo.id) ? 'completed' : ''}
              >
                <div className="view">
                  <input
                    type="checkbox"
                    className="toggle"
                    data-id={todo.id}
                    onChange={this.checkDo}
                    checked={todo.isDone === true}
                  />
                  <button
                    type="button"
                    className="label button-do"
                    onClick={this.checkDo}
                    data-id={todo.id}
                  >
                    {todo.todoName}
                  </button>
                  <button
                    type="button"
                    className="destroy"
                    onClick={this.deleteDo}
                    data-id={todo.id}
                  />
                </div>
              </li>
            ))
          }
        </ul>
      </section>
    );
  }
}

LayoutMain.propTypes = {
  getTodos: PropTypes.func.isRequired,
  allDone: PropTypes.func.isRequired,
  checkDone: PropTypes.func.isRequired,
  destroyElement: PropTypes.func.isRequired,
};

export default LayoutMain;
