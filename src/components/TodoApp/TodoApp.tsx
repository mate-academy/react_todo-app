import React, { useContext, useState } from 'react';
import { TodosContext } from '../../utils/TodosContext';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { Status } from '../../types/Status';

export const TodoApp: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { todos, setTodos } = useContext(TodosContext);
  const [filter, setFilter] = useState(Status.ALL);
  const noCompleteTodos = todos.filter(todo => !todo.completed);
  const allCompleted = todos.every(todo => todo.completed);
  const isSomeComplete = todos.some(todo => todo.completed);

  const handlerFilterChange = (newFilter: Status) => {
    setFilter(newFilter);
  };

  const filteredList = todos.filter(todo => {
    if (filter === Status.ALL) {
      return true;
    }

    if (filter === Status.ACTIVE) {
      return !todo.completed;
    }

    return todo.completed;
  });

  const handleTodoAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = inputValue.trim();

    if (trimmed) {
      const newTodo: Todo = {
        id: +new Date(),
        title: trimmed,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleCompleteAll = () => {
    let updatedTodos;

    if (todos.some(todo => !todo.completed)) {
      updatedTodos = todos.map((todo) => ({
        ...todo,
        completed: true,
      }));
    } else {
      updatedTodos = todos.map((todo) => ({
        ...todo,
        completed: false,
      }));
    }

    setTodos(updatedTodos);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleTodoAdd}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
        </form>
      </header>

      {todos.length !== 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={allCompleted}
              onChange={handleCompleteAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={filteredList} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${noCompleteTodos.length} items left`}
            </span>

            <TodosFilter filter={filter} onFilterChange={handlerFilterChange} />

            {isSomeComplete && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClearCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
