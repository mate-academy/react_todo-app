import React from 'react';
import PropTypes from 'prop-types';

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

    if (this.props.getTodos().show === 'Active') {
      listOfTodos = listOfTodos.filter(todo => todo.isDone === false);
    }

    if (this.props.getTodos().show === 'All') {
      const list = this.props.getTodos().listOfTodos;

      listOfTodos = list;
    }

    if (this.props.getTodos().show === 'Completed') {
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
          className="toggle-all"
          checked={listOfTodos.length === completedIds.length
            && listOfTodos.length !== 0}
          onChange={this.allIsDone}
        />
        <label htmlFor="toggle-all">{labelText}</label>
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
                  <label htmlFor="noexist">
                    {todo.todoName}
                  </label>
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
