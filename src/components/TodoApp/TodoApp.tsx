import React, {
  useContext,
  useState,
  useEffect,
} from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const { pathname } = useLocation();

  const setLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  useEffect(() => {
    setLocalTodos();
  }, [todos]);

  const addTodo = () => {
    if (title === '') {
      return;
    }

    const newTodo: Todo = {
      id: uuidv4(),
      title,
      completed: false,
    };

    setTodos((prevTodos: Todo[]) => ([
      ...prevTodos, newTodo,
    ]));
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo();
  };

  const handleTodosStatus = (status: boolean) => {
    setTodos((prevTodos: Todo[]) => (
      [...prevTodos].map(todo => {
        return {
          ...todo,
          completed: status,
        };
      })
    ));
  };

  const todosStatus = todos.every(todo => todo.completed === true);
  const activeTodos = todos.filter(todo => todo.completed === false);

  const getVisibleTodos = () => {
    switch (pathname) {
      case '/active':
        return todos.filter(todo => !todo.completed);

      case '/completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const removeCompletedTodos = () => {
    setTodos((prevTodos: Todo[]) => (
      [...prevTodos].filter(todo => (
        todo.completed === false
      ))
    ));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>To do list</h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
          data-cy="createTodo"
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event) => (
              setTitle(event.target.value.trimLeft())
            )}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
          data-cy="toggleAll"
            type="checkbox"
            id="toggleAll"
            className="toggle-all"
            checked={todosStatus}
            onChange={() => (
              handleTodosStatus(!todosStatus)
            )}
          />
          <label htmlFor="toggleAll">
            Mark all as complete
          </label>
          <TodoList
            getVisibleTodos={getVisibleTodos}
          />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {(activeTodos.length === 0 && (
              'No items'
            )) || (activeTodos.length === 1 && (
              `${activeTodos.length} item is left`
            )) || (activeTodos.length > 1 && (
              `${activeTodos.length} items are left`
            ))}
          </span>

          <TodosFilter />

          {todos.some(todo => todo.completed === true) && (
            <button
              type="button"
              className="clear-completed"
              onClick={removeCompletedTodos}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
};
