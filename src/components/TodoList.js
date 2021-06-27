import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos }) => {
  const [filteredTodos, setfilteredTodos] = useState(todos);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/completed')) {
      setfilteredTodos(todos.filter(todo => todo.completed));

      return;
    }

    if (location.pathname.includes('/active')) {
      setfilteredTodos(todos.filter(todo => !todo.completed));

      return;
    }

    setfilteredTodos(todos);
  }, [todos, location]);

  return (
    <ul className="todo-list" key="keyUL">
      {filteredTodos.map(
        todo => (
          <Todo
            todo={todo}
          />
        ),
      )}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(state => ({ todos: state.todos.todos }), null)(TodoList);
