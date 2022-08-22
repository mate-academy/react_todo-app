/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { getLocalTodos } from './lib/utils';
import { Todo } from './types/types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(window.location.hash.slice(2));
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const filterHandler = useCallback(() => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      case 'active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      default:
        setFilteredTodos(todos);
    }
  }, [status, todos]);

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const countCompleted = () => {
    return todos.filter(todo => !todo.completed).length;
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleUpdate = (todoId: number, newTitle: string) => {
    setTodos(todos.map(todo => {
      if (todoId !== todo.id) {
        return todo;
      }

      return {
        ...todo,
        title: newTitle,
      };
    }));
  };

  const mainCount = todos.length - countCompleted();

  const toggleAll = () => {
    setTodos(todos.map(todo => {
      if (mainCount < todos.length) {
        if (!todo.completed) {
          return {
            ...todo,
            completed: true,
          };
        }

        return todo;
      }

      return {
        ...todo,
        completed: !todo.completed,
      };
    }));
  };

  useEffect(() => {
    getLocalTodos(setTodos);
    filterHandler();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddTodoForm
          todos={todos}
          onCreateTodo={setTodos}
        />
      </header>
      {todos.length > 0 && (
        <div>
          <section className="main">
            <TodoList
              todos={todos}
              filteredTodos={filteredTodos}
              onSettingTodo={setTodos}
              onUpdate={handleUpdate}
              onToggle={toggleAll}
            />
          </section>
          <Router>
            <TodosFilter
              onClear={clearCompleted}
              onSettingStatus={setStatus}
              onCountCompleted={countCompleted}
            />
          </Router>
        </div>
      )}
    </div>
  );
};
