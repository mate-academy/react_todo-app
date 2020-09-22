import React, { useState, useEffect, useMemo } from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { FILTERS } from './constants';

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

  const notCompletedTodos = useMemo(() => (
    todoList.filter(todo => !todo.completed)
  ));

  useEffect(() => {
    if (notCompletedTodos.length === 0) {
      setToggleAll(true);
    } else {
      setToggleAll(false);
    }
  }, [notCompletedTodos]);

  useEffect(() => {
    if (localStorage.todoList) {
      setTodoList(JSON.parse(localStorage.getItem('todoList')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <TodoApp setTodoList={setTodoList} />
      </header>

      {todoList.length !== 0 && (
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
              {notCompletedTodos.length}
              {notCompletedTodos.length > 1 || notCompletedTodos.length === 0
                ? ' todos left'
                : ' todo left'}
            </span>

            <TodosFilter
              filter={filter}
              setFilter={setFilter}
            />

            {notCompletedTodos.length !== todoList.length && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => setTodoList(notCompletedTodos)}
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
