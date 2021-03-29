import React, { useContext, ChangeEvent } from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosContext } from './components/TodosContext';
import { TodosFilter } from './components/TodosFilter';

const App = React.memo(
  () => {
    const { todos, setTodos } = useContext(TodosContext);

    const notCompletedTodos = todos.filter(todo => !todo.completed);

    const changeStatusForAllTodos = (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;

      const todosWithNewStatus = [...todos].map(todo => ({
        ...todo,
        completed: checked,
      }));

      setTodos(todosWithNewStatus);
    };

    const clearCompleted = () => {
      const updatedTodos = todos.filter(todo => !todo.completed);

      setTodos(updatedTodos);
    };

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoApp />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={todos.every(todo => todo.completed) && !!todos.length}
            onChange={changeStatusForAllTodos}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList />

        </section>

        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {`${notCompletedTodos.length} item${notCompletedTodos.length <= 1
                ? ''
                : 's'
              } left`}
            </span>

            <TodosFilter />

            <button
              type="button"
              className="clear-completed"
              hidden={!todos.some(todo => todo.completed)}
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </section>
    );
  },
);

export default App;
