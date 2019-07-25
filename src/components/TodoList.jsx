import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = (props) => {
  const {
    filteredTodos,
    filterDescription,
    handleTodoToggle,
    handleAllToggle,
    handleDestroyTodo,
  } = props;

  let { todos } = props;

  if (filterDescription === 'active' || filterDescription === 'completed') {
    todos = filteredTodos;
  }

  return (
    <section className="main" style={{ display: 'block' }}>

      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={() => handleAllToggle()}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">

        {todos.map(todoItem => (
          <TodoItem
            key={todoItem.id}
            todo={todoItem}
            handleTodoToggle={handleTodoToggle}
            handleDestroyTodo={handleDestroyTodo}
          />
        ))}

      </ul>
    </section>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.instanceOf(Date),
  })).isRequired,
  handleTodoToggle: PropTypes.func,
  handleAllToggle: PropTypes.func,
  handleDestroyTodo: PropTypes.func,
  filterDescription: PropTypes.string,
  filteredTodos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.instanceOf(Date),
  })),
};

TodoList.defaultProps = {
  handleTodoToggle: () => {},
  handleAllToggle: () => {},
  handleDestroyTodo: () => {},
  filterDescription: '',
  filteredTodos: [],
};

export default TodoList;
