import React, { useState, useEffect, useMemo } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { NewTodo } from './NewTodo';
import { TodosToggler } from './TodosToggler';
import { TodoCount } from './TodoCount';
import { Filter } from '../constants/Filter';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filterValue, setFilterValue] = useState(Filter.all);

  const activeTodosLength = useMemo(() => todos
    .filter(todo => !todo.completed).length, [todos]);
  const completedTodosLength = useMemo(() => todos
    .filter(todo => todo.completed).length, [todos]);

  useEffect(() => {
    if (localStorage.getItem('todos')) {
      setTodos([...JSON.parse(localStorage.getItem('todos'))]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleTodoAddition = (title) => {
    if (title) {
      setTodos([...todos, {
        id: +new Date(),
        title,
        completed: false,
      }]);
    }
  };

  const handleToggleTodosStatus = (e) => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: e.target.checked,
    })));
  };

  const handleTodoChange = (id, editedTitle) => {
    if (editedTitle) {
      setTodos(todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: editedTitle,
          };
        }

        return { ...todo };
      }));
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <NewTodo
          onTodoAddition={handleTodoAddition}
        />
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <TodosToggler
              activeTodosLength={activeTodosLength}
              onToggleTodosStatus={handleToggleTodosStatus}
            />

            <TodoList
              filterValue={filterValue}
              setTodos={setTodos}
              todos={todos}
              onTodoChange={handleTodoChange}
            />
          </section>

          <footer className="footer">
            <TodoCount activeTodosLength={activeTodosLength} />

            <TodosFilter
              filterValue={filterValue}
              setFilter={setFilterValue}
            />

            {completedTodosLength > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => {
                  setTodos(todos.filter(todo => !todo.completed));
                }}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </section>
  );
};
