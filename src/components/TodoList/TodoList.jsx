import React, { useCallback, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { TodosContext } from '../TodosContext';
import { TodoItem } from '../TodoItem';
import { TodosFilter } from '../TodosFilter';
import { filterTodos } from '../../filterTodos';

export const TodoList = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const filter = useLocation().pathname;

  const allCompleted = useMemo(() => (todos.length
    === filterTodos(todos, '/completed').length), [todos]);
  const toggleAll = useCallback(() => {
    setTodos((prev) => {
      let newTodos = [...prev];

      newTodos = newTodos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));
      localStorage.setItem('todos', JSON.stringify(todos));

      return [...newTodos];
    });
  }, [todos, allCompleted]);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={allCompleted}
        onChange={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {filterTodos(todos, filter).map(todo => (
          <TodoItem key={todo.id} id={todo.id} />
        ))}
      </ul>
      {todos.length !== 0 && (<TodosFilter />)}
    </section>
  );
};
