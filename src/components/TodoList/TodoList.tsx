import React, { useContext, useState } from 'react';
import { TodosContext } from '../../TodosContext';
import { TodoItem } from '../TodoItem';
import { TodosFilter } from '../TodosFilter';

export const TodoList = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const [filterParam, setFilterParam] = useState('All');

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const todosCopy = [...todos].map(todo => ({
      ...todo, completed: event.target.checked,
    }));

    setTodos(todosCopy);
  };

  return (
    <>
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
          {todos.filter(todo => {
            switch (filterParam) {
              case ('All'):
                return true;
              case ('Active'):
                return !todo.completed;
              case ('Completed'):
                return todo.completed;
              default:
                return true;
            }
          }).map(todo => (
            <TodoItem key={todo.id} todo={todo} />
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
      <TodosFilter
        onClick={(newFilter) => setFilterParam(newFilter)}
        selectedFilterParam={filterParam}
      />
    </>
  );
};
