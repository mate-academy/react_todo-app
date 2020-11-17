import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList';
import { Filters } from './components/Filters';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initialValue,
  );
  const save = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};

function App() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filteredTodos, setfilteredTodos] = useState(todos);
  const [filterStatus, setFilterStatus] = useState('');
  const [activeSelectAll, setActiveSelectAll] = useState(false);

  const addTodo = (value) => {
    setTitle(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (title.length === 0) {
      return;
    }

    const newTodo = {
      title,
      id: uuidv4(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setfilteredTodos([...todos, newTodo]);

    setTitle('');
  };

  const toggleAll = () => {
    const uncheckedTodos = todos.map(todo => (
      {
        ...todo,
        completed: false,
      }
    ));

    setTodos(uncheckedTodos);
    setfilteredTodos(uncheckedTodos);
  };

  const changeStatus = (checkedTodoId) => {
    const todosCopy = todos.map((todo) => {
      if (todo.id === checkedTodoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(todosCopy);
    setfilteredTodos(todosCopy);
  };

  useEffect(() => {
    if (filterStatus === 'all' || filterStatus === '') {
      setfilteredTodos(todos);
    } else {
      const filter = filterStatus === 'completed';

      const filteredList = todos.filter(todo => (
        todo.completed === filter
      ));

      setfilteredTodos(filteredList);
    }
  }, [filterStatus, todos]);

  const deleteTodo = (todoIdForDelete) => {
    const filteredList = todos.filter(todo => (
      todo.id !== todoIdForDelete
    ));

    setTodos(filteredList);
    setfilteredTodos(filteredList);
  };

  useEffect(() => {
    if (!activeSelectAll) {
      const checkStatus = todos.some(todo => (
        todo.completed === true
      ));

      if (checkStatus) {
        setActiveSelectAll(true);
      }
    } else {
      const checkStatus = todos.every(todo => (
        todo.completed === false
      ));

      if (checkStatus) {
        setActiveSelectAll(false);
      }
    }
  }, [todos, activeSelectAll]);

  const clearAllCompleted = () => {
    const filteredList = todos.filter(todo => (
      todo.completed === false
    ));

    setTodos(filteredList);
    setfilteredTodos(filteredList);

    if (filterStatus === 'completed') {
      setFilterStatus('all');
    }
  };

  const updateTodoItem = (todoId, newTitle) => {
    const todosCopy = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: newTitle,
        };
      }

      return todo;
    });

    setTodos(todosCopy);
    setfilteredTodos(todosCopy);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => addTodo(event.target.value)}
          />
        </form>
      </header>
      {!!todos.length && (
        <>
          <TodoList
            todos={filteredTodos}
            changeStatus={changeStatus}
            deleteTodo={deleteTodo}
            forToggleAll={toggleAll}
            updateTodoItem={updateTodoItem}
          />

          <footer className="footer">
            {filteredTodos.length !== 0 && (
              <span className="todo-count">
                {`${filteredTodos.length} item(s) left`}
              </span>
            )}

            <Filters
              setFilterStatus={setFilterStatus}
              filterStatus={filterStatus}
              activeSelectAll={activeSelectAll}
            />

            {activeSelectAll && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearAllCompleted}
              >
                Clear completed tasks
              </button>
            )}

          </footer>
        </>
      )}

    </section>
  );
}

export default App;
