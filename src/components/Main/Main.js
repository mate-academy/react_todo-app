import React from 'react';
import cn from 'classnames';
import { mainType } from '../../typedefs/mainType';
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
    <section className="main">
      <label
        className={cn('label', { 'label-checked-all': isAllCompleted })}
        htmlFor="toggle-all"
      >
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={onToggleAllCompleted}
          checked={isAllCompleted}
        />
        Mark all as complete
      </label>

      <ToDoList
        {...{ visibleTodos }}
        onToggle={onToggleTodoCompleted}
        onDelete={onDeleteCurrentTodo}
        onEdit={onEditCurrentTodo}
        handleKeyPress={handleKeyPress}
        setEditedValue={setEditedValue}
      />
    </section>
  );
};

Main.propTypes = mainType.isRequired;
