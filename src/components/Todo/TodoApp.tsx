import React, { useMemo, useState } from 'react';
import { TodosContext } from '../../TodosContext';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { Status } from '../../types/Status';

export const TodoApp: React.FC = () => {
  const [todoInput, setTodoInput] = useState('');
  const { todos, setTodos, filteredType } = React.useContext(TodosContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  };

  const filterTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filteredType) {
        case Status.All:
          return true;
        case Status.Completed:
          return todo.completed;
        case Status.Active:
          return !todo.completed;
        default:
          return true;
      }
    });
  }, [filteredType, todos]);

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const reset = () => {
    setTodoInput('');
  };

  const addNewTodo = () => {
    if (!todoInput.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: todoInput.trim(),
      completed: false,
    };

    setTodos((prevTodos) => ([...prevTodos, newTodo]));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addNewTodo();
    reset();
  };

  const handleSetAllCompleted = () => {
    const allCompleted = todos.every(todo => todo.completed === true);

    if (allCompleted) {
      const updatedTodos = todos.map(todo => ({
        ...todo,
        completed: false,
      }));

      setTodos(updatedTodos);
    } else {
      const updatedTodos = todos.map(todo => ({
        ...todo,
        completed: true,
      }));

      setTodos(updatedTodos);
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form
          method="POST"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoInput}
            onChange={handleInputChange}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onClick={handleSetAllCompleted}
          />
          {todos.length > 0 && (
            <label htmlFor="toggle-all">Mark all as complete</label>
          )}

          <TodoList todos={filterTodos} />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todos.filter(todo => !todo.completed).length} items left`}
          </span>

          <TodosFilter />

          {todos.filter(todo => todo.completed).length > 0 && (
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
