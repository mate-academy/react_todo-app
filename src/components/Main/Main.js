import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ToDoList } from '../ToDoList';
import './Main.scss';

export const Main = ({
  todos,
  visibleTodos,
  onToggleTodoCompleted,
  onDeleteCurrentTodo,
  onToggleAllCompleted,
  onEditCurrentTodo,
  handleKeyPress,
  setEditedValue,
}) => {
  const isAllCompleted = todos.every(todo => todo.completed);

  return (
    <section className={cn('main')}>
      <label
        className={cn(isAllCompleted ? 'label-checked-all' : 'label')}
        htmlFor="toggle-all"
      >
        <input
          type="checkbox"
          id="toggle-all"
          className={cn('toggle-all')}
          onChange={onToggleAllCompleted}
          checked={isAllCompleted}
        />
        Mark all as complete
      </label>

      <ToDoList
        items={visibleTodos}
        onToggleTodo={onToggleTodoCompleted}
        onDeleteTodo={onDeleteCurrentTodo}
        onEditTodo={onEditCurrentTodo}
        handleKeyPress={handleKeyPress}
        setEditedValue={setEditedValue}
      />
    </section>
  );
};

Main.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteCurrentTodo: PropTypes.func.isRequired,
  onToggleTodoCompleted: PropTypes.func.isRequired,
  onToggleAllCompleted: PropTypes.func.isRequired,
  onEditCurrentTodo: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  setEditedValue: PropTypes.func.isRequired,
};
