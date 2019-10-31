import React from 'react';
import TodoList from '../TodoList/TodoList';
import PropTypes from 'prop-types';

class Main extends React.Component {

  render () {
    const {
      todoList,
      deleteItem,
      chooseFinishTask,
      toggleAllTodos,
      activeFilter
    } = this.props;

    return (
      <section className="main" style={{ display: 'block' }}>
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
        />
        <label htmlFor="mark-all" onClick={() => toggleAllTodos()}>Mark all as complete</label>
        <TodoList
          todoList={todoList}
          deleteItem={deleteItem}
          chooseFinishTask={chooseFinishTask}
          activeFilter={activeFilter}
        />
      </section>
    )
  }
}

Main.propTypes = {
  todoList: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
  chooseFinishTask: PropTypes.func.isRequired,
  toggleAllTodos: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired
}

export default Main;
