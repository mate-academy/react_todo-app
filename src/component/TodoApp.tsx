import { useContext, useState } from 'react';
import { TodosContext } from './TodoContext';
import { Filter } from '../types/Filter';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';

export const TodoApp = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [filter, setFilter] = useState(Filter.ALL);
  const [title, setTitle] = useState('');

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim() !== '') {
      const newTodos = {
        id: +new Date(),
        title,
        completed: false,
      };

      setTodos(todos.concat(newTodos));
      setTitle('');
    }
  };

  const changeTaskTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const completeAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.ALL:
        return true;
      case Filter.ACTIVE:
        return !todo.completed;
      case Filter.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  const filterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  const clearComplete = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const toCompleteTodos = todos.filter(todo => !todo.completed);
  const areAllCompleted = todos.every(todo => todo.completed === true);
  const hasCompleted = todos.some(todo => todo.completed === true);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={addTodo} onBlur={addTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={changeTaskTitle}
          />
        </form>
      </header>

      {!!todos.length && (
        <section className="main">
          <input
            checked={areAllCompleted}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={completeAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList todos={filteredTodos} />
        </section>
      )}

      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${toCompleteTodos.length} items left`}
          </span>

          <TodoFilter filter={filter} onFilterChange={filterChange} />

          {hasCompleted && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearComplete}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
