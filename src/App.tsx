import React, { useEffect, useState, useContext } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { TodosContext } from './TodosContext';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const {
    todos,
    setTodos,
  } = useContext(TodosContext);
  const [filteredBy, setFilteredBy] = useState(FilterBy.all);
  const [toggleAll, setToggleAll] = useState(false);
  const numberOfNotCompleted = todos.filter(item => !item.completed).length;

  const filteredTodos = todos.filter((todo) => {
    switch (filteredBy) {
      case FilterBy.active:
        return !todo.completed;
      case FilterBy.completed:
        return todo.completed;
      default:
        return true;
    }
  });

  useEffect(() => {
    setToggleAll(!numberOfNotCompleted && !!todos.length);
  }, [numberOfNotCompleted]);

  const handleToggleAll = () => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !toggleAll,
    })));

    setToggleAll(!toggleAll);
  };

  const handleClearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    setTodos(activeTodos);
  };

  return (
    <div className="todoapp">
      <Header />

      <section className="main">
        {!!todos.length && (
          <div>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={toggleAll}
              onClick={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </div>
        )}

        {!!todos.length && (
          <TodoList
            filteredTodos={filteredTodos}
          />
        )}
      </section>

      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${numberOfNotCompleted} item${numberOfNotCompleted !== 1 ? 's' : ''} left`}
          </span>

          <TodosFilter
            filteredBy={filteredBy}
            setFilteredBy={setFilteredBy}
          />

          {(todos.length !== numberOfNotCompleted) && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
