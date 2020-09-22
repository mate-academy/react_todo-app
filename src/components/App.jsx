import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { TodoList } from './TodoList/TodoList';
import { AddTodos } from './AddTodos/AddTodos';
import { TodosFilter } from './TodosFilter/TodosFilter';
import { FILTERS } from '../constants';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filterForTodos, setFilterForTodos] = useState(FILTERS.all);
  const [unCompletedTodos, setUnCompletedTodos] = useState('');
  const [completedTodos, setCompletedTodos] = useState('');
  const [allTodosToogler, setAllTodosToogler] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('todos'))) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  const filterTodosByCompleteStatus = () => {
    if (filterForTodos === FILTERS.all) {
      return todos;
    }

    return todos.filter(todo => (
      filterForTodos === FILTERS.completed
        ? todo.completed
        : !todo.completed
    ));
  };

  const filteredTodos = useMemo(
    () => filterTodosByCompleteStatus(),
    [filterForTodos, todos],
  );

  useEffect(() => {
    setUnCompletedTodos(() => todos.filter(todo => !todo.completed));
    setCompletedTodos(() => todos.filter(todo => todo.completed));
    setAllTodosToogler(() => todos.every(item => item.completed === true));

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const markAllTodos = useCallback(() => {
    setTodos(prev => prev
      .map(todo => ({ ...todo, completed: !allTodosToogler })));
  }, [allTodosToogler]);

  const removeTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const changeTodo = (todoId, newTodoTitle) => {
    setTodos(prev => (prev.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: newTodoTitle,
        };
      }

      return todo;
    })
    ));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddTodos
          todos={todos}
          setTodos={setTodos}
        />
      </header>
      {todos.length !== 0
        ? (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                checked={allTodosToogler}
                onChange={() => markAllTodos()}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>

              <TodoList
                todos={filteredTodos}
                setTodos={setTodos}
                removeTodo={removeTodo}
                changeTodo={changeTodo}
              />
            </section>

            <footer className="footer">
              <span className="todo-count">
                {unCompletedTodos.length}
                {unCompletedTodos.length === 1 ? ' item ' : ' items '}
                left
              </span>

              <TodosFilter
                todos={todos}
                filterForTodos={filterForTodos}
                setFilterForTodos={setFilterForTodos}
                FILTERS={FILTERS}
              />
              {completedTodos.length > 0
                ? (
                  <button
                    type="button"
                    className="clear-completed"
                    onClick={() => setTodos(unCompletedTodos)}
                  >
                    Clear completed
                  </button>
                )
                : ''
              }

            </footer>
          </>
        )
        : ''
      }

    </section>
  );
};

export default App;
