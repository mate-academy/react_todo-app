import React, { useEffect, useState } from 'react';
import { InputField } from './components/InputField';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key)) || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [allStatus, setAllStatus] = useState(false);
  const [filter, setFilter] = useState('all');
  const [todosOnPage, setTodosOnPage] = useState([...todos]);

  useEffect(() => {
    setTodosOnPage([...todos]);
  }, [todos]);

  const addNewTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const toggleCompletedStatus = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }

      return todo;
    }));
  };

  const removeItem = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isCompleted));
  };

  const toggleAll = () => {
    if (allStatus) {
      setTodos(todos.map(todo => ({
        ...todo,
        isCompleted: false,
      })));
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        isCompleted: true,
      })));
    }

    setAllStatus(!allStatus);
  };

  const handleEditingTodo = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isBeingEdited: true,
        };
      }

      return {
        ...todo,
        isBeingEdited: false,
      };
    }));
  };

  const handleEnter = (todoId, value) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isBeingEdited: false,
          title: value,
        };
      }

      return todo;
    }));
  };

  const handleEscape = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isBeingEdited: false,
        };
      }

      return todo;
    }));
  };

  const handleFilter = (value) => {
    switch (value) {
      case ('active'):
        setFilter('active');
        break;
      case ('completed'):
        setFilter('completed');
        break;
      case ('all'):
        setFilter('all');
        break;
      default:
        return filter;
    }

    return filterTodos();
  };

  const filterTodos = () => {
    let filtered = [...todos];

    switch (filter) {
      case ('active'):
        filtered = filtered
          .filter(todo => todo.isCompleted === false);
        setTodosOnPage(filtered);

        return todosOnPage;
      case ('completed'):
        filtered = filtered
          .filter(todo => todo.isCompleted === true);
        setTodosOnPage(filtered);

        return todosOnPage;
      case ('all'):
        setTodosOnPage([...todos]);

        return todosOnPage;

      default:
        return todosOnPage;
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <InputField addNewTodo={addNewTodo} />
      </header>

      <section className="main">
        {(todos.length > 0 && todos.every(todo => todo.isCompleted === true))
          ? (
            <input
              checked
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              onChange={toggleAll}
            />
          )
          : (
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              onChange={toggleAll}
            />
          )
        }
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          filter={filter}
          handleEnter={handleEnter}
          handleEditingTodo={handleEditingTodo}
          removeItem={removeItem}
          toggleCompletedStatus={toggleCompletedStatus}
          todos={todosOnPage}
          handleEscape={handleEscape}
        />
      </section>

      {(todos.length >= 1) && (
        <Footer
          filter={filter}
          clearCompleted={clearCompleted}
          todos={todos}
          handleFilter={handleFilter}
        />
      )}
    </section>
  );
}

export default App;
