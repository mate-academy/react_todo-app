import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { TodosContext } from './TodosContext';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

type Props = {};

export const TodoApp: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const storedTodos = window.localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [setTodos]);

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle.trim() === '') {
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: newTitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTitle('');
  };

  const clearCompletedTodos = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  const uncompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const isAllTodosCompleted = todos.every((todo) => todo.completed === true);

  const handleTodosStatusChange = () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo, completed: !isAllTodosCompleted,
    }));

    setTodos(updatedTodos);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={addTodo}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      { todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              checked={isAllTodosCompleted}
              className="toggle-all"
              data-cy="toggleAll"
              onChange={handleTodosStatusChange}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {
                `${uncompletedTodos.length} items left`
              }
            </span>
            <TodosFilter />

            {todos.length - uncompletedTodos.length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearCompletedTodos}
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
