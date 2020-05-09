import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import { TodoItem } from './TodoItem';
import { Checkbox } from '../Form/Checkbox';

export const TodoList = ({
  todoList,
  editingTodoId,
  selectedAll,
  toggleTodoStatus,
  toggleTodoAllStatus,
  deleteTodo,
  setEditingId,
  setTodoValue,
}) => (
  <section className="main">
    <Checkbox 
      id="toggle-all"
      name="toggle-all"
      className="toggle-all"
      checked={selectedAll}
      handleChange={toggleTodoAllStatus}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {todoList.map((todo, index) => (
        <TodoItem
          {...todo}
          editingTodoId={editingTodoId}
          toggleTodoStatus={toggleTodoStatus}
          deleteTodo={deleteTodo}
          setEditingId={setEditingId}
          setTodoValue={setTodoValue}
          key={todo.id}
        />
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  editingTodoId: PropTypes.number.isRequired,
  selectedAll: PropTypes.bool.isRequired,
  toggleTodoStatus: PropTypes.func.isRequired,
  toggleTodoAllStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  setEditingId: PropTypes.func.isRequired,
  setTodoValue: PropTypes.func.isRequired,
};
