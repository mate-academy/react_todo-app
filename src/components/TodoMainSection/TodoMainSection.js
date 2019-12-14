import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TodoList from './TodoList';

const TodoMainSection = (props) => {
  const {
    todoList,
    filteredTodoList,
    onCompletedTodo,
    onDeletedTodo,
    onCompletedList,
  } = props;

  const checkOnComplete = todoList.every(todo => todo.completed);

  return (
    <section className="main">
      <label
        className={cn(checkOnComplete ? 'label-checked-all' : 'label')}
        htmlFor="toggle-all"
      >
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={onCompletedList}
          checked={checkOnComplete}
        />
          Mark all as complete
      </label>

      <TodoList
        items={filteredTodoList}
        onToggledTodo={onCompletedTodo}
        onDeletedTodo={onDeletedTodo}
      />
    </section>
  );
};

TodoMainSection.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredTodoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeletedTodo: PropTypes.func.isRequired,
  onCompletedTodo: PropTypes.func.isRequired,
  onCompletedList: PropTypes.func.isRequired,
};

export default TodoMainSection;
