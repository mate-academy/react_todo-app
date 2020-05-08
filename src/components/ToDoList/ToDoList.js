import React from 'react';
import { todoListType } from '../../typedefs/todoListType';
import { ToDoItem } from '../ToDoItem';
import './ToDoList.scss';

export const ToDoList = ({
  visibleTodos,
  onToggle,
  onDelete,
  onEdit,
  handleKeyPress,
  setEditedValue,
}) => (
  <ul className="todo-list">
    {visibleTodos.map(todo => (
      <ToDoItem
        key={todo.id}
        {...{ todo }}
        onToggle={() => onToggle(todo.id)}
        onDelete={() => onDelete(todo.id)}
        onEdit={() => onEdit(todo.id)}
        handleKeyPress={handleKeyPress}
        setEditedValue={setEditedValue}
      />
    ))}
  </ul>
);

ToDoList.propTypes = todoListType.isRequired;
