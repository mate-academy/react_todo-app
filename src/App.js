import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FILTERS } from './constants';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { getFilterValue, getTodos } from './store';
import * as todosActions from './store/todos';

const getFilteredTodos = (todos, filterValue) => {
  switch (filterValue) {
    case FILTERS.active:
      return todos.filter(todo => !todo.completed);

    case FILTERS.completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};

function App() {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const filterValue = useSelector(getFilterValue);

  const toggleTodo = (todoId) => {
    const action = todosActions.toggleTodo(todoId);

    dispatch(action);
  };

  const clearCompleted = () => {
    const action = todosActions.clearCompleted();

    dispatch(action);
  };

  const toggleAll = () => {
    const completed = activeTodos.length !== 0;
    const action = todosActions.toggleAllTodos(completed);

    dispatch(action);
  };

  const activeTodos = todos.filter(todo => !todo.completed);

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filterValue),
    [todos, filterValue],
  );

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <AddTodoForm />
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={activeTodos.length === 0}
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={filteredTodos}
            onTodoToggle={toggleTodo}
          />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {activeTodos.length === 1
              ? `1 item left`
              : `${activeTodos.length} items left`
            }
          </span>

          <TodosFilter />

          {todos.length > activeTodos.length && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
}

export default App;
