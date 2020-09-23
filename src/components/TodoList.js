import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export function TodoList({
  filteredList,
  setUneditedTitles,
  uneditedTitles,
  todoList,
  setTodoList,
}) {
  return (
    <ul className="todo-list">
      {filteredList.map((todo, index) => (
        <TodoItem
          key={todo.id}
          uneditedTitles={uneditedTitles}
          setUneditedTitles={setUneditedTitles}
          todoList={todoList}
          setTodoList={setTodoList}
          todo={todo}
          index={index}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  filteredList: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  setTodoList: PropTypes.func.isRequired,
  setUneditedTitles: PropTypes.func.isRequired,
  uneditedTitles: PropTypes.shape().isRequired,
};
