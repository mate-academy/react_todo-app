import React, { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFIlter';

const FILTERS = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [todosStatus, setTodosStatus] = useState('');

  useEffect(() => {
    setTodos(todos);
    setVisibleTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const createTodo = (title) => {
    setTodos([
      ...todos,
      {
        title,
        id: +new Date(),
        completed: false,
        editing: false,
      },
    ]);
  };

  const getTodos = (status) => {
    switch (status) {
      case FILTERS.all:
        setVisibleTodos(todos);
        setTodosStatus('all');
        break;
      case FILTERS.completed:
        setVisibleTodos([...todos].filter(todo => todo.completed));
        setTodosStatus('completed');
        break;
      case FILTERS.active:
        setVisibleTodos([...todos].filter(todo => !todo.completed));
        setTodosStatus('active');
        break;
      default:
        break;
    }
  };

  const changeTodoStatus = (todoId) => {
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

  const toggleAll = () => {
    if (todos.every(todo => todo.completed)) {
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
  };

  const activeTodos = [...todos].filter(todo => !todo.completed);

  const deleteTodo = (todoId) => {
    setTodos([...todos].filter(todo => todo.id !== todoId));
  };

  const completedTodos = [...todos].filter(todo => todo.completed);

  const clearCompleted = () => {
    setTodos([...todos].filter(todo => !todo.completed));
  };

  const onTodoEdit = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          editing: !todo.editing,
        };
      }

      return todo;
    }));
  };

  const changeTitle = (todoId, newTitle) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: newTitle,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="text"
            className="new-todo"
            value={todoTitle}
            placeholder="What needs to be done?"
            onChange={(event) => {
              setTodoTitle(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && todoTitle.trim()) {
                createTodo(todoTitle.trim());
                setTodoTitle('');
              }
            }}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          checked={todos.length > 0 && todos.every(todo => todo.completed)}
          className="toggle-all"
          onChange={() => {
            toggleAll();
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={visibleTodos}
          changeStatus={changeTodoStatus}
          deleteTodo={deleteTodo}
          onTodoEdit={onTodoEdit}
          changeTitle={changeTitle}
          getTodos={getTodos}
        />
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <TodosFilter
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            getTodos={getTodos}
            clearCompleted={clearCompleted}
            todosStatus={todosStatus}
          />
        </footer>
      )}
    </section>
  );
}

export default App;
