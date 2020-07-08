import React from 'react';
import { TodoListTypes } from '../Shapes/Shapes';
import { TodoItem } from '../TodoItem/TodoItem';

export class TodoList extends React.Component {
  state = {};

  render() {
    const {
      items,
      toggle,
      onDeleted,
      onAllSelected,
      onEditTask,
    } = this.props;

    return (
      <>
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={onAllSelected}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {items.map(task => (
            <li key={task.id}>
              <TodoItem
                id={task.id}
                isCompleted={task.completed}
                title={task.title}
                toggle={toggle}
                onDeleted={onDeleted}
                onEditTask={onEditTask}
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

TodoList.propTypes = TodoListTypes;

TodoList.defaultProps = {
  tasks: [],
};
