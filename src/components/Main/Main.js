import React from 'react';
import PropTypes from 'prop-types';

import ToggleAll from '../ToggleAll/ToggleAll';
import TodoList from '../TodoList/TodoList';

const Main = (props) => {
  const {
    todos,
    todosFilter,
    toggleAllCompleted,
    toggleCompleted,
    editTodo,
    destroyTodo,
  } = props;

  return (
    <section className="main">
      {
        todos.length > 0
          && (
            <ToggleAll
              todos={todos}
              toggleAllCompleted={toggleAllCompleted}
            />
          )
      }

      <TodoList
        items={todos.filter(todosFilter)}
        toggleCompleted={toggleCompleted}
        editTodo={editTodo}
        destroyTodo={destroyTodo}
      />
    </section>
  );
};

export default Main;

Main.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  todosFilter: PropTypes.func.isRequired,
  toggleAllCompleted: PropTypes.func.isRequired,
  toggleCompleted: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
};
