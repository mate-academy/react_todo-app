/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
// import React, { useState } from 'react';
import React, { useState } from 'react';
import { TodosContext } from './TodosContext';
// import { Todo } from './types/Todo';
import { useLocalStorage } from './useLocalStorage';
import { FilterType } from './types/Filter';
import { Header } from './Header';
import { TodosFilter } from './TodosFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('', []);
  const [filter, setFilter] = useState(FilterType.All);
  // const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="todoapp">
      <TodosContext.Provider value={{ todos, setTodos }}>
        <Header />

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list" data-cy="todoList">
            <li>
              <div className="view">
                <input type="checkbox" className="toggle" id="toggle-view" />
                <label htmlFor="toggle-view">asdfghj</label>
                <button type="button" className="destroy" data-cy="deleteTodo" />
              </div>
              <input type="text" className="edit" />
            </li>

            <li className="completed">
              <div className="view">
                <input type="checkbox" className="toggle" id="toggle-completed" />
                <label htmlFor="toggle-completed">qwertyuio</label>
                <button type="button" className="destroy" data-cy="deleteTodo" />
              </div>
              <input type="text" className="edit" />
            </li>

            <li className="editing">
              <div className="view">
                <input type="checkbox" className="toggle" id="toggle-editing" />
                <label htmlFor="toggle-editing">zxcvbnm</label>
                <button type="button" className="destroy" data-cy="deleteTodo" />
              </div>
              <input type="text" className="edit" />
            </li>

            <li>
              <div className="view">
                <input type="checkbox" className="toggle" id="toggle-view2" />
                <label htmlFor="toggle-view2">1234567890</label>
                <button type="button" className="destroy" data-cy="deleteTodo" />
              </div>
              <input type="text" className="edit" />
            </li>
          </ul>
        </section>

        <TodosFilter filter={filter} setFilter={setFilter} />
      </TodosContext.Provider>
    </div>
  );
};
