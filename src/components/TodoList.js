import React from 'react';
import propTypes from 'prop-types';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  state = {

  }

  render() {
    const { tasks, toggleCompleteTask, deleteTask } = this.props;

    return (
      <ul className="todo-list">
        {tasks.map(task => (
          <TodoItem
            task={task}
            toggleCompleteTask={toggleCompleteTask}
            deleteTask={deleteTask}
          />
        ))}
        {/* <li>
          <div className="view">
            <input type="checkbox" className="toggle" id="todo-1" />
            <label htmlFor="todo-1">asdfghj</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li className="completed">
          <div className="view">
            <input type="checkbox" className="toggle" id="todo-2" />
            <label htmlFor="todo-2">qwertyuio</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li className="editing">
          <div className="view">
            <input type="checkbox" className="toggle" id="todo-3" />
            <label htmlFor="todo-3">zxcvbnm</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li>
          <div className="view">
            <input type="checkbox" className="toggle" id="todo-4" />
            <label htmlFor="todo-4">1234567890</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li> */}
      </ul>
    );
  }
}

TodoList.propTypes = {
  tasks: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  })).isRequired,
  toggleCompleteTask: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
};

export default TodoList;
