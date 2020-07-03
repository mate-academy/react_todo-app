import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoListWithRouter } from './components/TodoList';
import { todoApi } from './api/api';
import { Context } from './components/common/Context';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoApi.request().then(setTodos);
  }, []);

  const addTodo = (title) => {
    const todo = {
      title,
      isCompleted: false,
    };

    todoApi.send(todo).then(id => setTodos(prev => [
      ...prev,
      {
        ...todo,
        id,
      },
    ]));
  };

  const setTodoCompleted = (id, isCompleted) => {
    setTodos(prev => prev.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted,
        };
      }

      return todo;
    }));

    todoApi.editItem(id, 'isCompleted', isCompleted);
  };

  const removeTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));

    todoApi.removeItem(id);
  };

  const clearCompleted = () => {
    todos.forEach((todo) => {
      if (todo.isCompleted) {
        removeTodo(todo.id);
      }
    });
  };

  const editTitle = (id, title) => {
    setTodos(prev => prev.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    }));

    todoApi.editItem(id, 'title', title);
  };

  return (
    <section className="todoapp">
      <Header addTodo={addTodo} />

      <HashRouter>
        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <Context.Provider value={{
            setTodoCompleted,
            removeTodo,
            editTitle,
          }}
          >
            <TodoListWithRouter todos={todos} />
          </Context.Provider>
        </section>

        <Footer todos={todos} clearCompleted={clearCompleted} />
      </HashRouter>
    </section>
  );
}

export default App;
