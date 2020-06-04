import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({
  todos,
  selectAllTodos,
  handlerStatus,
  clearTodo,
  tasks,
}) => (
  <>
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={selectAllTodos}
        checked={todos.every(todo => todo.isTodoCompleted)}
      />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>
      <ul className="todo-list">
        {tasks.map(todo => (
          <Todo
            todo={todo}
            key={todo.id}
            clearTodo={clearTodo}
            handlerStatus={handlerStatus}
          />
        ))}
      </ul>
    </section>
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    isTodoCompleted: PropTypes.bool,
  })).isRequired,
  selectAllTodos: PropTypes.func.isRequired,
  handlerStatus: PropTypes.func.isRequired,
  clearTodo: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    isTodoCompleted: PropTypes.bool,
  })).isRequired,
};

export default TodoList;
