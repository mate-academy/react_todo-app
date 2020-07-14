import React from 'react';
import PropTypes from 'prop-types';
import { TodoList } from '../TodoList/TodoList';
import { ToggleAll } from '../ToggleAll/ToggleAll';
import { todoShape } from '../../shapes/todoShape';

export const Main = ({
  todos,
  handleStatusChange,
  handleTitleChange,
  handleTodoRemove,
  handleToggleAll,
  notCompletedTodos,
  filter,
}) => (
  <section className="main">
    {
      todos.length > 0
      && (
        <ToggleAll
          handleToggleAll={handleToggleAll}
          allCompleted={!notCompletedTodos}
        />
      )
    }

    <TodoList
      items={todos}
      filter={filter}
      handleStatusChange={handleStatusChange}
      handleTitleChange={handleTitleChange}
      handleTodoRemove={handleTodoRemove}
    />
  </section>
);

Main.propTypes = {
  todos: PropTypes.arrayOf(todoShape).isRequired,
  notCompletedTodos: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleTodoRemove: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired,
};
