import React, { useEffect, useState } from 'react';
import { FILTER } from '../constants/constants';
import { TodoList } from '../Todos/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState(FILTER.all);

  const filtredTodos = todos.filter((todo) => {
    switch (filter) {
      case FILTER.active:
        return !todo.completed;

      case FILTER.completed:
        return todo.completed;

      default: return todo;
    }
  });

  const todosToggler = (event) => {
    const { checked } = event.target;

    setTodos(todos.map(todo => ({
      ...todo,
      completed: checked,
    })));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newTodo) {
      setTodos([
        ...todos,
        {
          title: newTodo,
          id: +new Date(),
          completed: false,
        },
      ]);
    }

    setNewTodo('');
  };

  const handleChange = (event) => {
    setNewTodo(event.target.value.trimStart());
  };

  useEffect(() => {
    if (!localStorage.todos) {
      localStorage.setItem('todos', JSON.stringify('todos'));
    } else {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={handleChange}
          />
        </form>
      </header>
      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={todos.every(todo => todo.completed)}
              onChange={todosToggler}
            />
            <label htmlFor="toggle-all">
              Mark all as complete
            </label>

            <TodoList
              filtredTodos={filtredTodos}
              setTodos={setTodos}
            />
          </section>

          <footer className="footer">
            <span className="todo-count">
              {`${todos.filter(todo => !todo.completed).length} items left`}
            </span>

            <TodosFilter
              filter={filter}
              setFilter={setFilter}
            />

            <button
              type="button"
              className="clear-completed"
              onClick={() => setTodos(todos.filter(todo => !todo.completed))}
            >
              Clear completed
            </button>
          </footer>
        </>
      )}
    </>
  );
};
