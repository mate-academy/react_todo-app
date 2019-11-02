import React from 'react';
import PropTypes from 'prop-types';
import TodoList from '../TodoList/TodoList';

class Main extends React.PureComponent {
  render() {
    const {
      todoList,
      deleteItem,
      chooseFinishTask,
      toggleAllTodos,
      activeFilter,
      changeTodoItem,
      editItem,
    } = this.props;

    return (
      <section className="main" style={{ display: 'block' }}>
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
        />
        <label
          htmlFor="mark-all"
          onClick={toggleAllTodos}
        >
          Mark all as complete
        </label>
        <TodoList
          editItem={editItem}
          todoList={todoList}
          deleteItem={deleteItem}
          chooseFinishTask={chooseFinishTask}
          activeFilter={activeFilter}
          changeTodoItem={changeTodoItem}
        />
      </section>
    );
  }
}

Main.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItem: PropTypes.func.isRequired,
  chooseFinishTask: PropTypes.func.isRequired,
  toggleAllTodos: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
  changeTodoItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};

export default Main;
