import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../context/TodoContext';

export const TodoList: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const completeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTodos
    = todos.map((item) => ({ ...item, completed: e.target.checked }));

    setTodos(updatedTodos);
  };

  return (
    <>
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={completeAll}
            checked={todos.length > 0
          && todos.every((todo) => todo.completed)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list" data-cy="todoList">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};
