// import React, { useContext, useState, ChangeEvent } from 'react';
import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodoList } from '../TodoList/TodoList';

export const Section: React.FC = () => {
  const {
    // todos, filteredTodos, setTodos, setFilteredTodos,
    todos, setTodos,
  } = useContext(TodosContext);

  const handleClick = () => {
    const completed = todos.filter(todo => todo.completed);
    const allCompleted = todos.map(todo => ({
      ...todo,
      completed: true,
    }));
    const allActive = todos.map(todo => ({
      ...todo,
      completed: false,
    }));

    if (completed.length === todos.length) {
      setTodos(allActive);
      // setFilteredTodos(allActive);
    } else {
      setTodos(allCompleted);
      // setFilteredTodos(allCompleted);
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleClick}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      {/* <TodoList filteredTodos={filteredTodos} /> */}
      <TodoList todos={todos} />

    </section>
  );
};
