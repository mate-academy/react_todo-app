import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TodoList from './TodoList';

const TodoMain = ({
  todos,
  visibleTodos,
  onToggleTodoCompleted,
  onDeleteCurrentTodo,
  onToggleAllCompleted,
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

      <TodoList
        items={visibleTodos}
        onToggleTodo={onToggleTodoCompleted}
        onDeleteTodo={onDeleteCurrentTodo}
      />
    </section>
  );
};

TodoMain.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteCurrentTodo: PropTypes.func.isRequired,
  onToggleTodoCompleted: PropTypes.func.isRequired,
  onToggleAllCompleted: PropTypes.func.isRequired,
};

export default TodoMain;
