import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../../TodosContext';

export const TodoList = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleToggleAll = () => (
    (todos.some(todo => !todo.completed))
      ? setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })))
      : setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })))
  );

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {todos && todos.map(({ id, title, completed }) => (
          <TodoItem
            key={id}
            id={id}
            title={title}
            completed={completed}
          />
        )).reverse()}
      </ul>
    </>
  );
};
