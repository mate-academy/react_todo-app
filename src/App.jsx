import React, { useState, useMemo, useEffect, useCallback } from 'react';
import TodoApp from './components/TodoApp/TodoApp';
import TodoList from './components/TodoList/TodoList';
import TodoFilter from './components/TodosFilter/TodosFilter';
import { TodoContext } from './TodoContext';

function App() {
  const [inputText, setInputText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [todos, setTodos] = useState([]);

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    }

    setTodos(JSON.parse(localStorage.getItem('todos')));
  };

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const getChangeTitle = useCallback((id, newTitle) => {
    setTodos(currentTodos => currentTodos
      .map(todo => ((todo.id === id && newTitle.length > 0)
        ? { ...todo, title: newTitle } : todo)));
  }, []);

  const filterTodos = useMemo(() => {
    switch (filterStatus) {
      case 'completed':
        return todos.filter(todo => todo.complete);
      case 'active':
        return todos.filter(todo => !todo.complete);
      default:
        return todos;
    }
  }, [filterStatus, todos]);

  const clearCompleted = useCallback(() => {
    setTodos(currentTodos => currentTodos
      .filter(todo => !todo.complete));
  }, []);

  return (
    <TodoContext.Provider value={{
      todos,
      setTodos,
      inputText,
      setInputText,
      filterTodos,
      getChangeTitle,
    }}
    >
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <TodoApp />
        </header>

        <section className="main">
          <TodoList />
        </section>

        <footer className="footer">
          <TodoFilter
            setFilterStatus={setFilterStatus}
            clearCompleted={clearCompleted}
            filterStatus={filterStatus}
          />
        </footer>
      </section>
    </TodoContext.Provider>

  );
}

export default App;
