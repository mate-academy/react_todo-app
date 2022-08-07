/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { Todo } from './types/types';

export const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const filterHandler = () => {
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
  };

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      setTodos(JSON.parse(localStorage.getItem('todos') || ''));
    }
  };

  const countCompleted = () => {
    let quantityCompleted = 0;

    todos.forEach(todo => {
      if (todo.completed) {
        quantityCompleted += 1;
      }
    });

    return todos.length - quantityCompleted;
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handlingUpdate = (todoId: number, newTitle: string) => {
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
    setStatus(window.location.hash.slice(2));
    getLocalTodos();
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
          inputText={inputText}
          onCreateTodo={setTodos}
          onInput={setInputText}
        />
      </header>
      {todos.length > 0 && (
        <div>
          <section className="main">
            <TodoList
              todos={todos}
              filteredTodos={filteredTodos}
              onSettingTodo={setTodos}
              onUpdate={handlingUpdate}
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
