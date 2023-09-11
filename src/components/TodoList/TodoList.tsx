import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodosContext } from '../../TodosContext';
import { TodoItem } from '../TodoItem';

export const TodoList = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const todosCopy = [...todos].map(todo => ({
      ...todo, completed: event.target.checked,
    }));

    setTodos(todosCopy);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos.map(todo => (
          <TodoItem key={uuidv4()} todo={todo} />
        ))}

        {/* <li className="editing">
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-editing" />
            <label htmlFor="toggle-editing">zxcvbnm</label>
            <button type="button" className="destroy" data-cy="deleteTodo" />
          </div>
          <input type="text" className="edit" />
        </li> */}
      </ul>
    </section>
  );
};
