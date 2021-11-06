import React, { useState, useEffect, useMemo } from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

const FILTERS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [toggleAll, setToggleAll] = useState(false);
  const [filter, setFilter] = useState(FILTERS.all);

  const filteredTodos = useMemo(() => todoList.filter((todo) => {
    switch (filter) {
      case FILTERS.active:
        return todo.completed === false;
      case FILTERS.completed:
        return todo.completed === true;
      default:
        return todo;
    }
  }), [filter, todoList]);

  const changeToggleAll = () => {
    setTodoList(
      todoList.map(todo => ({
        ...todo,
        completed: !toggleAll,
      })),
    );
  };

  const notCompleted = todoList.filter(todo => !todo.completed);

  useEffect(() => {
    if (notCompleted.length === 0) {
      setToggleAll(true);
    } else {
      setToggleAll(false);
    }
  }, [notCompleted]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <TodoApp setTodoList={setTodoList} />
      </header>

      {!!todoList.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={toggleAll}
              onChange={changeToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todoList={todoList}
              setTodoList={setTodoList}
              filteredTodos={filteredTodos}
            />
          </section>

          <footer className="footer">
            <span className="todo-count">
              {notCompleted.length}
              {notCompleted.length > 1 || notCompleted.length === 0
                ? ' todos left'
                : ' todo left'}
            </span>

            <TodosFilter
              filter={filter}
              setFilter={setFilter}
              FILTERS={FILTERS}
            />

            {notCompleted.length !== todoList.length && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => setTodoList(notCompleted)}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </section>
  );
}

export default App;
