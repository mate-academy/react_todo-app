import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MakeTodo } from './components/MakeTodo/index';
import { TodoList } from './components/TodoList/TodoList';
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
  const notCompleted = todoList.filter(item => !item.completed);

  useEffect(() => {
    if (localStorage.todoList) {
      setTodoList(JSON.parse(localStorage.getItem('todoList')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

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

  const changeToggleAll = useCallback(() => {
    setTodoList(
      todoList.map(todo => ({
        ...todo,
        completed: !toggleAll,
      })),
    );
  }, [notCompleted]);

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
        <h1>todos</h1>

        <MakeTodo setTodoList={setTodoList} />
      </header>

      {todoList.length > 0 && (
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
              setFilter={setFilter}
              FILTERS={FILTERS}
              filter={filter}
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
