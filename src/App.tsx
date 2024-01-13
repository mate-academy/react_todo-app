/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { ShowState } from './types/ShowState';

import { Todolist } from './components/Todolist';
import { TodosContext } from './context/TodosContext';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [todo, setTodo] = useState<string>('');
  const [showState, setShowState] = useState<ShowState>(ShowState.All);

  const filteredTodos = useMemo(() => {
    switch (showState) {
      case ShowState.All:
        return todos;
      case ShowState.Active:
        return todos.filter(toddo => !toddo.completed);
      case ShowState.Completed:
        return todos.filter(toddo => toddo.completed);
      default:
        return todos;
    }
  }, [showState, todos]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [setTodos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: React.FormEvent) => {
    if (todo) {
      e.preventDefault();

      const newTodo = {
        id: +new Date(),
        title: todo,
        completed: false,
      };

      setTodos((prevTodos) => {
        const newTodos = [...prevTodos, newTodo];

        return newTodos;
      });

      setTodo('');
    }
  };

  const handleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (value) {
      setTodo(value);
    }
  };

  const toggleAll = () => {
    setTodos((prevTodos) => {
      if (todos.every(tod => tod.completed)) {
        return prevTodos.map(toddo => ({
          ...toddo,
          completed: false,
        }));
      }

      return prevTodos.map(toddo => ({
        ...toddo,
        completed: true,
      }));
    });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>{todo}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={handleTodo}
            value={todo}
          />
        </form>
      </header>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={toggleAll}
          checked={todos.every(toddd => toddd.completed)}
        />
        <label
          htmlFor="toggle-all"
          style={{
            visibility: todos.length > 0 ? 'visible' : 'hidden',
          }}
        >
          Mark all as complete
        </label>
        <Todolist todos={filteredTodos} />
      </section>
      {todos.length > 0 && (
        <Footer
          todos={todos}
          showState={showState}
          setShowState={setShowState}
          setTodos={setTodos}
        />
      )}
    </div>
  );
};
