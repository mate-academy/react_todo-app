import React from 'react';
import propTypes from 'prop-types';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

export const Header = (
  { addTask,
    isAnyActiveTasks,
    tasks,
    toggleAllTasksCompleted,
    visibleTasks,
    toggleCompleteTask,
    deleteTask },
) => (
  <>
    <header className="header">
      <h1>todos</h1>
      <AddTodo addTask={addTask} />
    </header>

    <section className="main">
      <input
        checked={tasks.length > 0 && isAnyActiveTasks() === 0}
        onChange={toggleAllTasksCompleted}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList
        visibleTasks={visibleTasks}
        toggleCompleteTask={toggleCompleteTask}
        deleteTask={deleteTask}
      />
    </section>
  </>
);

Header.propTypes = {
  addTask: propTypes.func.isRequired,
  isAnyActiveTasks: propTypes.func.isRequired,
  toggleAllTasksCompleted: propTypes.func.isRequired,
  toggleCompleteTask: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
  visibleTasks: propTypes.arrayOf(propTypes.shape()).isRequired,
  tasks: propTypes.arrayOf(propTypes.shape()).isRequired,
};
