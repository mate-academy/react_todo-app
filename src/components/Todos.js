import React from 'react';
import { connect } from 'react-redux';
import { todoListProps } from '../propTypes/propTypes';

import TodoItem from './TodoItem';

import { getFilteredTodos, getCompletedLength } from '../redux/store';
import { togleAllComplete } from '../redux/todos';

function Todos({
  todos, completedLength, todosLength, ...props
}) {
  return (
    <section className="main">
      <input
        type="checkbox"
        onChange={props.togleAllComplete}
        id="toggle-all"
        className="toggle-all"
        checked={completedLength === todosLength}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {
          todos.map(todo => <TodoItem key={todo.id} todo={todo} />)
        }
      </ul>
    </section>
  );
}

const mapState = (state, ownProps) => ({
  todos: getFilteredTodos({ ...state, filter: ownProps.filter }),
  completedLength: getCompletedLength(state),
  todosLength: state.todos.length,
});

const mapActions = {
  togleAllComplete,
};

export default connect(mapState, mapActions)(Todos);

Todos.propTypes = todoListProps;
