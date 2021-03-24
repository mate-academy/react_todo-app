import React from 'react';
import PropTypes from 'prop-types';
import { TodoList } from '../TodoList';
import { ToggleAll } from '../ToggleAll';

export function Main({
  todos,
  onAddChecked,
  activeTodos,
  onToggleTodos,
  onRemoveTodo,
  onEditTitle,
}) {
  return (
    <section className="main">
      {todos.length > 0
        && (
          <ToggleAll
            activeTodos={activeTodos}
            onToggleTodos={onToggleTodos}
          />
        )
      }

      {todos.length > 0
        && (
          <TodoList
            todos={todos}
            onAddChecked={onAddChecked}
            onRemoveTodo={onRemoveTodo}
            onEditTitle={onEditTitle}
          />
        )
      }
    </section>
  );
}

Main.propTypes = {
  activeTodos: PropTypes.number.isRequired,
  onToggleTodos: PropTypes.func.isRequired,
  onAddChecked: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
};

Main.defaultProps = {
  todos: [],
};
