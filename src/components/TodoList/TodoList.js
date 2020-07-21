import React from 'react';
import { TodoListTypes } from '../Shapes/Shapes';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = (props) => {
  const {
    tasks,
    showOnlyActive,
    showOnlyCompleted,
    toggle,
    onDeleted,
    onAllSelected,
    onChangeCurrentTask,
  } = props;

  let tasksToShow = tasks;

  if (showOnlyActive) {
    tasksToShow = tasks.filter(task => task.completed === false);
  } else if (showOnlyCompleted) {
    tasksToShow = tasks.filter(task => task.completed === true);
  }

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={onAllSelected}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {tasksToShow.map(task => (
          <TodoItem
            key={task.id}
            id={task.id}
            isCompleted={task.completed}
            title={task.title}
            toggle={toggle}
            onDeleted={onDeleted}
            onChangeCurrentTask={onChangeCurrentTask}
          />

        ))}
      </ul>
    </section>
  );
};

TodoList.propTypes = TodoListTypes;

TodoList.defaultProps = {
  tasks: [],
};
