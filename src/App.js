import React, { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from './Components/localStorage';
import { Form } from './Components/Form/Form';
import { TodoList } from './Components/TodoList/TodoList';
import { TodosFilter } from './Components/TodosFilter/TodosFilter';

function App() {
  const [query, handleQuery] = useState('');
  const [checkboxIsActive, checkboxHandler] = useState(false);
  const [filterBy, selectFilterType] = useState('');

  const [todos, setTodos] = useLocalStorage('todos', []);

  const getFilteredTodos = (value) => {
    switch (value) {
      case 'completed':
        return todos.filter(todo => todo.completed);

      case 'uncompleted':
        return todos.filter(todo => !todo.completed);

      default:
      case 'all':
        return todos;
    }
  };

  const setFilter = useCallback((filterType) => {
    selectFilterType(filterType);
  }, [todos]);

  const removeCompletedTodos = useCallback(() => {
    setTodos(todos.filter(todo => !todo.completed));
  }, [todos]);

  const handleCompleteTodo = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        completed: !todo.completed,
      };
    }));
  };

  const handleChangeTodo = (todoId, title) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        title,
      };
    }));
  };

  const handleDeleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return false;
    }));
  };

  const filteredTodos = useMemo(
    () => getFilteredTodos(filterBy),
    [filterBy, todos, checkboxIsActive],
  );

  const toggleCheckbox = () => {
    if (checkboxIsActive) {
      checkboxHandler(false);
      setTodos(todos
        .map(todo => ({
          ...todo,
          completed: false,
        })));
    } else {
      checkboxHandler(true);
      setTodos(todos
        .map(todo => ({
          ...todo,
          completed: true,
        })));
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <Form
          handleQuery={handleQuery}
          query={query}
          setTodos={setTodos}
          todos={todos}
        />
      </header>

      {todos.length !== 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            defaultChecked={checkboxIsActive}
            onChange={toggleCheckbox}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            handleCompleteTodo={handleCompleteTodo}
            handleChangeTodo={handleChangeTodo}
            handleDeleteTodo={handleDeleteTodo}
            todos={filteredTodos}
            setTodos={setTodos}
          />
        </section>
      )}

      {todos.length > 0 && (
        <TodosFilter
          todos={todos}
          setFilter={setFilter}
          removeCompletedTodos={removeCompletedTodos}
          filterBy={filterBy}
        />
      )}
    </section>
  );
}

export default App;
