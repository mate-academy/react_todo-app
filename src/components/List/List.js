import React from 'react';
import PropTypes from 'prop-types';

import Todo from '../Todo/Todo';
import TodoChecker from '../TodoChecker/TodoChecker';

const List = ({ todos, onDelete, onToggle, onEdit }) => {
  const showTodo = todos.length === 0
    ? <TodoChecker />
    : todos.map(todo => (
      <Todo
        key={todo.id}
        id={todo.id}
        title={todo.title}
        completed={todo.completed}
        onDelete={onDelete}
        onToggle={onToggle}
        onEdit={onEdit}
      />
    ));

  return (
    <section className="todo-list">
      {showTodo}
    </section>
  );
};

List.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default List;
