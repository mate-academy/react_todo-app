import React, { useState, useMemo } from 'react';
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

  const saveValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, saveValue];
};

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [allStatus, setAllStatus] = useState(false);
  const [filter, setFilter] = useState('all');

  const getTodos = (todosList) => {
    switch (filter) {
      case ('active'):
        return todosList.filter(todo => todo.completed === false);

      case ('completed'):
        return todosList.filter(todo => todo.completed === true);

      default:
        return todosList;
    }
  };

  const filteredTodos = useMemo(() => getTodos(todos), [todos, filter]);

  const addNewTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const toggleCompletedStatus = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const removeItem = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    if (allStatus) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })));
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
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

  const handleEditedTodo = (todoId, title) => {
    if (title.trim()) {
      setTodos(todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            isBeingEdited: false,
            title,
          };
        }

        return todo;
      }));

      return todos;
    }

    return todos;
  };

  const handleFilter = (value) => {
    setFilter(value);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <InputField addNewTodo={addNewTodo} />
      </header>

      <section className="main">
        {todos.length === 0 && (<></>)}
        {(todos.length > 0 && todos.every(todo => todo.completed === true)) && (
          <>
            <input
              checked
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              onChange={toggleAll}
              value={allStatus}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        ) }
        {(todos.length > 0 && !todos
          .every(todo => todo.completed === true))
          && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                onChange={toggleAll}
                value={allStatus}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
            </>
          )
        }

        <TodoList
          filter={filter}
          handleEditedTodo={handleEditedTodo}
          handleEditingTodo={handleEditingTodo}
          removeItem={removeItem}
          toggleCompletedStatus={toggleCompletedStatus}
          todos={filteredTodos}
        />
      </section>

      {(todos.length > 0) && (
        <Footer
          clearCompleted={clearCompleted}
          todos={todos}
          handleFilter={handleFilter}
        />
      )}
    </section>
  );
}

export default App;
