/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';

import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

export type Todo = {
  id: number, title: string, completed: boolean,
};

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

  useEffect(() => {
    getLocalTodos();
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

      <section className="main">
        <TodoList
          todos={todos}
          filteredTodos={filteredTodos}
          onSettingTodo={setTodos}
        />
      </section>

      <footer className="footer">
        <TodosFilter
          onSettingStatus={setStatus}
        />
      </footer>
    </div>
  );
};
